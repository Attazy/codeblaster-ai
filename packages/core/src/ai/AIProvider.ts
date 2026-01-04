import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { AIProviderConfig } from '../types';

export interface AIAnalysisRequest {
  code: string;
  language: string;
  filePath: string;
  context?: string;
}

export interface AIAnalysisResponse {
  issues: Array<{
    severity: string;
    category: string;
    message: string;
    line: number;
    suggestion: string;
    confidence: number;
  }>;
  summary: string;
  improvements: string[];
}

export class AIProvider {
  private config: AIProviderConfig;
  private openai?: OpenAI;
  private anthropic?: Anthropic;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.initializeProvider();
  }

  private initializeProvider() {
    switch (this.config.provider) {
      case 'openai':
        this.openai = new OpenAI({
          apiKey: this.config.apiKey,
          baseURL: this.config.baseURL,
          timeout: this.config.timeout || 30000,
        });
        break;
      case 'anthropic':
        this.anthropic = new Anthropic({
          apiKey: this.config.apiKey,
          timeout: this.config.timeout || 30000,
        });
        break;
      case 'ollama':
        // Local LLM setup
        break;
    }
  }

  async analyzeCode(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const prompt = this.buildPrompt(request);

    switch (this.config.provider) {
      case 'openai':
        return this.analyzeWithOpenAI(prompt);
      case 'anthropic':
        return this.analyzeWithAnthropic(prompt);
      case 'ollama':
        return this.analyzeWithOllama(prompt);
      default:
        throw new Error(`Unsupported AI provider: ${this.config.provider}`);
    }
  }

  private buildPrompt(request: AIAnalysisRequest): string {
    return `You are an expert code reviewer. Analyze the following ${request.language} code and identify:
1. Security vulnerabilities (SQL injection, XSS, exposed secrets, etc.)
2. Performance issues (inefficient algorithms, memory leaks, etc.)
3. Code smells (long functions, code duplication, etc.)
4. Best practice violations
5. Potential bugs

File: ${request.filePath}
${request.context ? `Context: ${request.context}` : ''}

Code:
\`\`\`${request.language}
${request.code}
\`\`\`

Provide response in JSON format:
{
  "issues": [
    {
      "severity": "critical|error|warning|info",
      "category": "security|performance|maintainability|code_smell|bug|best_practice",
      "message": "Brief description",
      "line": <line_number>,
      "suggestion": "How to fix it",
      "confidence": <0-100>
    }
  ],
  "summary": "Overall code quality assessment",
  "improvements": ["List of general improvements"]
}`;
  }

  private async analyzeWithOpenAI(prompt: string): Promise<AIAnalysisResponse> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const response = await this.openai.chat.completions.create({
      model: this.config.model || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code reviewer. Always respond with valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: this.config.temperature || 0.3,
      max_tokens: this.config.maxTokens || 2000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('Empty response from OpenAI');

    return JSON.parse(content) as AIAnalysisResponse;
  }

  private async analyzeWithAnthropic(prompt: string): Promise<AIAnalysisResponse> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const response = await this.anthropic.messages.create({
      model: this.config.model || 'claude-3-5-sonnet-20241022',
      max_tokens: this.config.maxTokens || 2000,
      temperature: this.config.temperature || 0.3,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    return JSON.parse(content.text) as AIAnalysisResponse;
  }

  private async analyzeWithOllama(prompt: string): Promise<AIAnalysisResponse> {
    const baseURL = this.config.baseURL || 'http://localhost:11434';
    
    const response = await axios.post(`${baseURL}/api/generate`, {
      model: this.config.model || 'codellama',
      prompt,
      stream: false,
      format: 'json',
    });

    return JSON.parse(response.data.response) as AIAnalysisResponse;
  }

  async batchAnalyze(requests: AIAnalysisRequest[]): Promise<AIAnalysisResponse[]> {
    // Parallel analysis with rate limiting
    const results = await Promise.all(
      requests.map((request) => this.analyzeCode(request))
    );
    return results;
  }
}

export default AIProvider;
