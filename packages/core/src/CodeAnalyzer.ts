import {
  AnalyzerConfig,
  AnalysisResult,
  AnalysisIssue,
  Language,
  RuleContext,
  SourceCode,
} from './types';
import MultiLanguageParser from './parsers/MultiLanguageParser';
import AIProvider from './ai/AIProvider';
import CacheManager from './cache/CacheManager';
import PluginManager from './plugins/PluginManager';
import securityRules from './analyzers/security-rules';
import performanceRules from './analyzers/performance-rules';
import codeQualityRules from './analyzers/code-quality-rules';
import PQueue from 'p-queue';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

export class CodeAnalyzer {
  private config: AnalyzerConfig;
  private parser: MultiLanguageParser;
  private aiProvider: AIProvider;
  private cache: CacheManager;
  private pluginManager: PluginManager;
  private queue: PQueue;

  constructor(config: AnalyzerConfig) {
    this.config = config;
    this.parser = new MultiLanguageParser();
    this.aiProvider = new AIProvider(config.ai);
    this.cache = new CacheManager(
      config.cache || { enabled: true, type: 'memory', ttl: 3600 }
    );
    this.pluginManager = new PluginManager();
    this.queue = new PQueue({ concurrency: config.maxConcurrency || 5 });

    this.loadDefaultRules();
  }

  private loadDefaultRules(): void {
    const allRules = [...securityRules, ...performanceRules, ...codeQualityRules];
    
    allRules.forEach((rule) => {
      if (
        rule.language.includes(this.config.language) &&
        (!this.config.rules || this.config.rules.includes(rule.id)) &&
        (!this.config.excludeRules || !this.config.excludeRules.includes(rule.id))
      ) {
        this.pluginManager.getAllRules().push(rule);
      }
    });
  }

  async analyzeFile(filePath: string): Promise<AnalysisIssue[]> {
    const startTime = Date.now();
    const content = await fs.readFile(filePath, 'utf-8');
    const language = this.parser.detectLanguage(filePath);

    const cacheKey = this.cache.generateKey('analysis', { filePath, content });
    const cached = await this.cache.get<AnalysisIssue[]>(cacheKey);
    if (cached) {
      console.log(`Cache hit for ${filePath}`);
      return cached;
    }

    const issues: AnalysisIssue[] = [];

    // Static analysis with rules
    const staticIssues = await this.runStaticAnalysis(filePath, content, language);
    issues.push(...staticIssues);

    // AI-powered analysis
    if (this.config.ai) {
      const aiIssues = await this.runAIAnalysis(filePath, content, language);
      issues.push(...aiIssues);
    }

    await this.cache.set(cacheKey, issues);
    
    const duration = Date.now() - startTime;
    console.log(`Analyzed ${filePath} in ${duration}ms - Found ${issues.length} issues`);

    return issues;
  }

  private async runStaticAnalysis(
    filePath: string,
    content: string,
    language: Language
  ): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];
    const sourceCode = this.createSourceCode(content);

    const context: RuleContext = {
      filePath,
      content,
      ast: null,
      language,
      sourceCode,
    };

    try {
      const parsed = this.parser.parse({ language, content, filePath });
      context.ast = parsed.rootNode;
    } catch (error) {
      console.warn(`Failed to parse ${filePath}:`, error);
    }

    const rules = this.pluginManager.getEnabledRules().filter((rule) =>
      rule.language.includes(language)
    );

    for (const rule of rules) {
      try {
        const ruleIssues = rule.check(context);
        issues.push(...ruleIssues);
      } catch (error) {
        console.error(`Error running rule ${rule.id}:`, error);
      }
    }

    return issues;
  }

  private async runAIAnalysis(
    filePath: string,
    content: string,
    language: Language
  ): Promise<AnalysisIssue[]> {
    try {
      const response = await this.aiProvider.analyzeCode({
        code: content,
        language: language.toString(),
        filePath,
      });

      return response.issues.map((issue) => ({
        id: crypto.randomUUID(),
        severity: issue.severity as any,
        category: issue.category as any,
        rule: 'ai-analysis',
        message: issue.message,
        file: filePath,
        line: issue.line,
        column: 0,
        codeSnippet: this.getLineFromContent(content, issue.line),
        suggestion: issue.suggestion,
        fixable: false,
        confidence: issue.confidence,
      }));
    } catch (error) {
      console.error('AI analysis failed:', error);
      return [];
    }
  }

  async analyzeDirectory(directory: string, pattern = '**/*'): Promise<AnalysisResult> {
    const startTime = Date.now();
    const files = await glob(pattern, { cwd: directory, absolute: true });
    
    const supportedExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs'];
    const filesToAnalyze = files.filter((file) =>
      supportedExtensions.some((ext) => file.endsWith(ext))
    );

    console.log(`Analyzing ${filesToAnalyze.length} files...`);

    const allIssues: AnalysisIssue[] = [];

    if (this.config.parallel) {
      const results = await Promise.all(
        filesToAnalyze.map((file) =>
          this.queue.add(() => this.analyzeFile(file))
        )
      );
      results.forEach((issues) => {
        if (issues) allIssues.push(...issues);
      });
    } else {
      for (const file of filesToAnalyze) {
        const issues = await this.analyzeFile(file);
        allIssues.push(...issues);
      }
    }

    const duration = Date.now() - startTime;

    return {
      files: filesToAnalyze.length,
      issues: allIssues,
      summary: {
        critical: allIssues.filter((i) => i.severity === 'critical').length,
        error: allIssues.filter((i) => i.severity === 'error').length,
        warning: allIssues.filter((i) => i.severity === 'warning').length,
        info: allIssues.filter((i) => i.severity === 'info').length,
      },
      duration,
      timestamp: new Date(),
    };
  }

  async analyzeGitChanges(directory: string): Promise<AnalysisResult> {
    const { execSync } = require('child_process');
    
    try {
      const output = execSync('git diff --name-only --cached', { 
        cwd: directory,
        encoding: 'utf-8' 
      });
      
      const changedFiles = output
        .split('\n')
        .filter(Boolean)
        .map((file: string) => path.join(directory, file));

      const startTime = Date.now();
      const allIssues: AnalysisIssue[] = [];

      for (const file of changedFiles) {
        try {
          const issues = await this.analyzeFile(file);
          allIssues.push(...issues);
        } catch (error) {
          console.error(`Failed to analyze ${file}:`, error);
        }
      }

      const duration = Date.now() - startTime;

      return {
        files: changedFiles.length,
        issues: allIssues,
        summary: {
          critical: allIssues.filter((i) => i.severity === 'critical').length,
          error: allIssues.filter((i) => i.severity === 'error').length,
          warning: allIssues.filter((i) => i.severity === 'warning').length,
          info: allIssues.filter((i) => i.severity === 'info').length,
        },
        duration,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new Error('Not a git repository or no staged changes');
    }
  }

  private createSourceCode(content: string): SourceCode {
    const lines = content.split('\n');
    
    return {
      getText: (node?: any) => {
        if (node) {
          return content.substring(node.startIndex, node.endIndex);
        }
        return content;
      },
      getLines: () => lines,
      getLine: (line: number) => lines[line - 1] || '',
      getTokens: () => [], // Simplified
    };
  }

  private getLineFromContent(content: string, lineNumber: number): string {
    const lines = content.split('\n');
    return lines[lineNumber - 1] || '';
  }

  async cleanup(): Promise<void> {
    await this.cache.disconnect();
  }
}

export default CodeAnalyzer;
