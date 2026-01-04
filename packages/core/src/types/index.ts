// Core Types and Interfaces

export enum Severity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  GO = 'go',
  RUST = 'rust',
  CPP = 'cpp',
  PHP = 'php',
  RUBY = 'ruby',
  SWIFT = 'swift',
  KOTLIN = 'kotlin',
  CSHARP = 'csharp',
  SCALA = 'scala',
  ELIXIR = 'elixir',
  DART = 'dart',
  LUA = 'lua',
  SHELL = 'shell',
  SQL = 'sql',
  HTML = 'html',
  CSS = 'css',
}

export enum IssueCategory {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  MAINTAINABILITY = 'maintainability',
  CODE_SMELL = 'code_smell',
  BUG = 'bug',
  BEST_PRACTICE = 'best_practice',
  DOCUMENTATION = 'documentation',
}

export interface AnalysisIssue {
  id: string;
  severity: Severity;
  category: IssueCategory;
  rule: string;
  message: string;
  description?: string;
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  codeSnippet: string;
  suggestion?: string;
  fixable: boolean;
  autoFix?: string;
  references?: string[];
  confidence: number; // 0-100
}

export interface AnalysisResult {
  files: number;
  issues: AnalysisIssue[];
  summary: {
    critical: number;
    error: number;
    warning: number;
    info: number;
  };
  duration: number; // milliseconds
  timestamp: Date;
}

export interface ParserOptions {
  language: Language;
  content: string;
  filePath: string;
}

export interface AIProviderConfig {
  provider: 'openai' | 'anthropic' | 'ollama' | 'custom';
  apiKey?: string;
  model: string;
  baseURL?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

export interface CacheConfig {
  enabled: boolean;
  type: 'memory' | 'redis';
  ttl: number; // seconds
  redisUrl?: string;
}

export interface AnalyzerConfig {
  language: Language;
  rules: string[];
  excludeRules?: string[];
  severity: Severity;
  ai: AIProviderConfig;
  cache?: CacheConfig;
  parallel?: boolean;
  maxConcurrency?: number;
}

export interface Plugin {
  name: string;
  version: string;
  rules: Rule[];
  analyzers?: CustomAnalyzer[];
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  category: IssueCategory;
  language: Language[];
  enabled: boolean;
  pattern?: string | RegExp;
  check: (context: RuleContext) => AnalysisIssue[];
}

export interface RuleContext {
  filePath: string;
  content: string;
  ast: any; // AST node
  language: Language;
  sourceCode: SourceCode;
}

export interface SourceCode {
  getText(node?: any): string;
  getLines(): string[];
  getLine(line: number): string;
  getTokens(node?: any): Token[];
}

export interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface CustomAnalyzer {
  name: string;
  analyze: (file: string, content: string) => Promise<AnalysisIssue[]>;
}

export interface GitHubPRContext {
  owner: string;
  repo: string;
  pullNumber: number;
  files: GitHubFile[];
}

export interface GitHubFile {
  filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  additions: number;
  deletions: number;
  patch?: string;
  content?: string;
}
