import { AnalysisIssue, Severity, IssueCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface ArchitecturePattern {
  name: string;
  detected: boolean;
  confidence: number;
  violations: string[];
}

export class ArchitectureAnalyzer {
  async analyzeArchitecture(
    _projectPath: string,
    files: string[]
  ): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    // Detect architecture patterns
    this.detectPatterns(files);

    // Check for anti-patterns
    const antiPatterns = this.detectAntiPatterns(files);
    issues.push(...antiPatterns);

    // Check code organization
    const orgIssues = this.checkCodeOrganization(files);
    issues.push(...orgIssues);

    // Check circular dependencies
    const circularDeps = await this.detectCircularDependencies(files);
    issues.push(...circularDeps);

    return issues;
  }

  private detectPatterns(files: string[]): ArchitecturePattern[] {
    const patterns: ArchitecturePattern[] = [];

    // MVC Pattern
    const hasMVC = files.some(f => f.includes('/models/')) &&
                   files.some(f => f.includes('/views/')) &&
                   files.some(f => f.includes('/controllers/'));
    
    if (hasMVC) {
      patterns.push({
        name: 'MVC',
        detected: true,
        confidence: 90,
        violations: [],
      });
    }

    // Microservices
    const hasMicroservices = files.some(f => f.includes('/services/')) &&
                             files.filter(f => f.includes('service')).length > 3;
    
    if (hasMicroservices) {
      patterns.push({
        name: 'Microservices',
        detected: true,
        confidence: 80,
        violations: [],
      });
    }

    // Layered Architecture
    const hasLayers = files.some(f => f.includes('/domain/')) &&
                      files.some(f => f.includes('/application/')) &&
                      files.some(f => f.includes('/infrastructure/'));

    if (hasLayers) {
      patterns.push({
        name: 'Layered Architecture',
        detected: true,
        confidence: 85,
        violations: [],
      });
    }

    return patterns;
  }

  private detectAntiPatterns(files: string[]): AnalysisIssue[] {
    const issues: AnalysisIssue[] = [];

    // God Object (too many files in one directory)
    const directoryCounts = new Map<string, number>();
    files.forEach(file => {
      const dir = file.substring(0, file.lastIndexOf('/'));
      directoryCounts.set(dir, (directoryCounts.get(dir) || 0) + 1);
    });

    directoryCounts.forEach((count, dir) => {
      if (count > 50) {
        issues.push({
          id: uuidv4(),
          severity: Severity.WARNING,
          category: IssueCategory.MAINTAINABILITY,
          rule: 'god-directory',
          message: `Directory "${dir}" contains too many files (${count})`,
          description: 'Large directories are hard to maintain. Consider splitting into subdirectories',
          file: dir,
          line: 1,
          column: 0,
          codeSnippet: `${count} files in one directory`,
          suggestion: 'Split into logical subdirectories',
          fixable: false,
          confidence: 90,
        });
      }
    });

    // Spaghetti Code Indicator (too flat structure)
    const maxDepth = Math.max(...files.map(f => f.split('/').length));
    if (maxDepth < 3 && files.length > 20) {
      issues.push({
        id: uuidv4(),
        severity: Severity.WARNING,
        category: IssueCategory.MAINTAINABILITY,
        rule: 'flat-structure',
        message: 'Project structure is too flat',
        description: 'Consider organizing code into logical modules/packages',
        file: 'project-root',
        line: 1,
        column: 0,
        codeSnippet: `Max depth: ${maxDepth} levels`,
        suggestion: 'Organize into modules: features, common, utils, etc.',
        fixable: false,
        confidence: 85,
      });
    }

    return issues;
  }

  private checkCodeOrganization(files: string[]): AnalysisIssue[] {
    const issues: AnalysisIssue[] = [];

    // Check for test file organization
    const hasTests = files.some(f => f.includes('.test.') || f.includes('.spec.'));
    const hasTestDir = files.some(f => f.includes('/tests/') || f.includes('/__tests__/'));

    if (hasTests && !hasTestDir) {
      issues.push({
        id: uuidv4(),
        severity: Severity.INFO,
        category: IssueCategory.BEST_PRACTICE,
        rule: 'test-organization',
        message: 'Consider organizing tests in dedicated directories',
        description: 'Tests scattered across project. Better to centralize',
        file: 'project-root',
        line: 1,
        column: 0,
        codeSnippet: 'Multiple test files without test directory',
        suggestion: 'Create __tests__ directories or centralized tests folder',
        fixable: false,
        confidence: 75,
      });
    }

    // Check for config file organization
    const configFiles = files.filter(f => 
      f.includes('config') || 
      f.match(/\.(json|yaml|yml|env|toml)$/)
    );

    if (configFiles.length > 5 && !files.some(f => f.includes('/config/'))) {
      issues.push({
        id: uuidv4(),
        severity: Severity.INFO,
        category: IssueCategory.BEST_PRACTICE,
        rule: 'config-organization',
        message: 'Many config files in root directory',
        description: 'Consider organizing config files in a dedicated directory',
        file: 'project-root',
        line: 1,
        column: 0,
        codeSnippet: `${configFiles.length} config files`,
        suggestion: 'Create /config directory for configuration files',
        fixable: false,
        confidence: 70,
      });
    }

    return issues;
  }

  private async detectCircularDependencies(_files: string[]): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    // Simplified circular dependency detection
    // In real implementation, parse imports and build dependency graph

    return issues;
  }

  calculateComplexityMetrics(code: string): {
    cyclomatic: number;
    cognitive: number;
    halstead: any;
  } {
    // Cyclomatic Complexity (simplified)
    const cyclomaticComplexity = this.calculateCyclomaticComplexity(code);

    // Cognitive Complexity
    const cognitiveComplexity = this.calculateCognitiveComplexity(code);

    // Halstead Metrics
    const halstead = this.calculateHalsteadMetrics(code);

    return {
      cyclomatic: cyclomaticComplexity,
      cognitive: cognitiveComplexity,
      halstead,
    };
  }

  private calculateCyclomaticComplexity(code: string): number {
    // Count decision points
    const patterns = [
      /\bif\b/g,
      /\belse\b/g,
      /\bfor\b/g,
      /\bwhile\b/g,
      /\bcase\b/g,
      /\bcatch\b/g,
      /\b\?\b/g, // ternary
      /&&/g,
      /\|\|/g,
    ];

    let complexity = 1; // Base complexity
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) complexity += matches.length;
    });

    return complexity;
  }

  private calculateCognitiveComplexity(code: string): number {
    // Cognitive complexity considers nesting
    let complexity = 0;
    let nesting = 0;

    const lines = code.split('\n');
    lines.forEach(line => {
      // Increase nesting
      if (line.includes('{')) nesting++;
      if (line.includes('}')) nesting--;

      // Add to complexity based on control structures and nesting
      if (/\b(if|for|while|switch|catch)\b/.test(line)) {
        complexity += (1 + nesting);
      }
    });

    return complexity;
  }

  private calculateHalsteadMetrics(code: string): any {
    // Halstead metrics: operators and operands
    const operators = code.match(/[+\-*/=<>!&|^~%?:]/g) || [];
    const operands = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];

    const n1 = new Set(operators).size; // Unique operators
    const n2 = new Set(operands).size; // Unique operands
    const N1 = operators.length; // Total operators
    const N2 = operands.length; // Total operands

    const vocabulary = n1 + n2;
    const length = N1 + N2;
    const volume = length * Math.log2(vocabulary || 1);
    const difficulty = (n1 / 2) * (N2 / (n2 || 1));
    const effort = difficulty * volume;

    return {
      vocabulary,
      length,
      volume: Math.round(volume),
      difficulty: Math.round(difficulty),
      effort: Math.round(effort),
    };
  }
}

export default ArchitectureAnalyzer;
