import {
  Rule,
  RuleContext,
  AnalysisIssue,
  Severity,
  IssueCategory,
  Language,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export const codeQualityRules: Rule[] = [
  {
    id: 'long-function',
    name: 'Long Function',
    description: 'Function exceeds recommended length',
    severity: Severity.WARNING,
    category: IssueCategory.CODE_SMELL,
    language: [
      Language.JAVASCRIPT,
      Language.TYPESCRIPT,
      Language.PYTHON,
      Language.JAVA,
      Language.GO,
    ],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const functionPattern = /function\s+\w+\s*\([^)]*\)\s*\{|const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{/g;
      let match;

      while ((match = functionPattern.exec(context.content)) !== null) {
        const startIndex = match.index;
        let braceCount = 1;
        let endIndex = startIndex + match[0].length;

        for (let i = endIndex; i < context.content.length && braceCount > 0; i++) {
          if (context.content[i] === '{') braceCount++;
          if (context.content[i] === '}') braceCount--;
          endIndex = i;
        }

        const functionBody = context.content.substring(startIndex, endIndex);
        const lines = functionBody.split('\n').length;

        if (lines > 50) {
          const line = context.content.substring(0, startIndex).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.WARNING,
            category: IssueCategory.CODE_SMELL,
            rule: 'long-function',
            message: `Function is too long (${lines} lines)`,
            description: 'Functions should be focused and under 50 lines',
            file: context.filePath,
            line,
            column: startIndex - context.content.lastIndexOf('\n', startIndex),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Break down into smaller, single-purpose functions',
            fixable: false,
            confidence: 100,
          });
        }
      }

      return issues;
    },
  },
  {
    id: 'console-log',
    name: 'Console Statement',
    description: 'Console statements should not be committed',
    severity: Severity.INFO,
    category: IssueCategory.CODE_SMELL,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const pattern = /console\.(log|debug|info|warn|error)\s*\(/g;
      let match;

      while ((match = pattern.exec(context.content)) !== null) {
        const line = context.content.substring(0, match.index).split('\n').length;
        issues.push({
          id: uuidv4(),
          severity: Severity.INFO,
          category: IssueCategory.CODE_SMELL,
          rule: 'console-log',
          message: 'Console statement found',
          description: 'Remove console statements before committing',
          file: context.filePath,
          line,
          column: match.index - context.content.lastIndexOf('\n', match.index),
          codeSnippet: context.sourceCode.getLine(line),
          suggestion: 'Use a proper logging library or remove',
          fixable: true,
          autoFix: '',
          confidence: 100,
        });
      }

      return issues;
    },
  },
  {
    id: 'magic-numbers',
    name: 'Magic Numbers',
    description: 'Unexplained numeric literals in code',
    severity: Severity.INFO,
    category: IssueCategory.MAINTAINABILITY,
    language: [
      Language.JAVASCRIPT,
      Language.TYPESCRIPT,
      Language.PYTHON,
      Language.JAVA,
    ],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const pattern = /(?<![a-zA-Z0-9_])((?!0|1)[0-9]{2,})(?![a-zA-Z0-9_])/g;
      let match;

      while ((match = pattern.exec(context.content)) !== null) {
        const line = context.content.substring(0, match.index).split('\n').length;
        const lineContent = context.sourceCode.getLine(line);

        if (!lineContent.includes('//') && !lineContent.includes('const')) {
          issues.push({
            id: uuidv4(),
            severity: Severity.INFO,
            category: IssueCategory.MAINTAINABILITY,
            rule: 'magic-numbers',
            message: 'Magic number detected',
            description: 'Use named constants for numeric literals',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: lineContent,
            suggestion: 'Extract to a named constant: const MAX_SIZE = 100',
            fixable: false,
            confidence: 70,
          });
        }
      }

      return issues;
    },
  },
  {
    id: 'duplicate-code',
    name: 'Code Duplication',
    description: 'Duplicated code blocks detected',
    severity: Severity.WARNING,
    category: IssueCategory.MAINTAINABILITY,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT, Language.PYTHON, Language.JAVA],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const lines = context.content.split('\n');
      const minLines = 5;
      const seen = new Map<string, number[]>();

      for (let i = 0; i < lines.length - minLines; i++) {
        const block = lines.slice(i, i + minLines).join('\n').trim();
        if (block.length < 50) continue;

        if (seen.has(block)) {
          seen.get(block)!.push(i + 1);
        } else {
          seen.set(block, [i + 1]);
        }
      }

      seen.forEach((lineNumbers, block) => {
        if (lineNumbers.length > 1) {
          lineNumbers.forEach((line) => {
            issues.push({
              id: uuidv4(),
              severity: Severity.WARNING,
              category: IssueCategory.MAINTAINABILITY,
              rule: 'duplicate-code',
              message: 'Duplicate code block found',
              description: `This code appears ${lineNumbers.length} times`,
              file: context.filePath,
              line,
              column: 0,
              codeSnippet: block.split('\n')[0],
              suggestion: 'Extract to a reusable function',
              fixable: false,
              confidence: 85,
            });
          });
        }
      });

      return issues;
    },
  },
  {
    id: 'missing-error-handling',
    name: 'Missing Error Handling',
    description: 'Async operations without error handling',
    severity: Severity.ERROR,
    category: IssueCategory.BUG,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const asyncPattern = /(?:async\s+function|\basync\s*\()/g;
      const catchPattern = /\.catch\(|try\s*\{/g;
      
      let match;
      while ((match = asyncPattern.exec(context.content)) !== null) {
        const startIndex = match.index;
        const endIndex = Math.min(startIndex + 500, context.content.length);
        const snippet = context.content.substring(startIndex, endIndex);
        
        if (!catchPattern.test(snippet)) {
          const line = context.content.substring(0, startIndex).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.ERROR,
            category: IssueCategory.BUG,
            rule: 'missing-error-handling',
            message: 'Async function without error handling',
            description: 'Always handle errors in async operations',
            file: context.filePath,
            line,
            column: startIndex - context.content.lastIndexOf('\n', startIndex),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Add try-catch block or .catch() handler',
            fixable: false,
            confidence: 80,
          });
        }
      }

      return issues;
    },
  },
];

export default codeQualityRules;
