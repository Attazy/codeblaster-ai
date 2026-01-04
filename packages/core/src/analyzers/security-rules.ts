import {
  Rule,
  RuleContext,
  AnalysisIssue,
  Severity,
  IssueCategory,
  Language,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export const securityRules: Rule[] = [
  {
    id: 'no-eval',
    name: 'No eval() usage',
    description: 'Avoid using eval() as it can execute arbitrary code',
    severity: Severity.CRITICAL,
    category: IssueCategory.SECURITY,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    pattern: /\beval\s*\(/g,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const pattern = /\beval\s*\(/g;
      let match;

      while ((match = pattern.exec(context.content)) !== null) {
        const line = context.content.substring(0, match.index).split('\n').length;
        issues.push({
          id: uuidv4(),
          severity: Severity.CRITICAL,
          category: IssueCategory.SECURITY,
          rule: 'no-eval',
          message: 'Use of eval() detected',
          description: 'eval() can execute arbitrary code and is a security risk',
          file: context.filePath,
          line,
          column: match.index - context.content.lastIndexOf('\n', match.index),
          codeSnippet: context.sourceCode.getLine(line),
          suggestion: 'Use safer alternatives like JSON.parse() or Function constructor',
          fixable: false,
          confidence: 100,
          references: [
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!',
          ],
        });
      }

      return issues;
    },
  },
  {
    id: 'sql-injection',
    name: 'SQL Injection Risk',
    description: 'Detect potential SQL injection vulnerabilities',
    severity: Severity.CRITICAL,
    category: IssueCategory.SECURITY,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT, Language.PYTHON, Language.PHP],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const patterns = [
        /query\s*\(\s*[`'"].*?\$\{.*?\}.*?[`'"]\s*\)/g,
        /execute\s*\(\s*[`'"].*?\+.*?[`'"]\s*\)/g,
        /\.query\s*\(\s*.*?\+.*?\)/g,
      ];

      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(context.content)) !== null) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.CRITICAL,
            category: IssueCategory.SECURITY,
            rule: 'sql-injection',
            message: 'Potential SQL injection vulnerability detected',
            description: 'User input appears to be directly concatenated into SQL query',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Use parameterized queries or prepared statements',
            fixable: false,
            confidence: 85,
            references: ['https://owasp.org/www-community/attacks/SQL_Injection'],
          });
        }
      });

      return issues;
    },
  },
  {
    id: 'hardcoded-secrets',
    name: 'Hardcoded Secrets',
    description: 'Detect hardcoded API keys, passwords, or tokens',
    severity: Severity.CRITICAL,
    category: IssueCategory.SECURITY,
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
      const patterns = [
        /(api[_-]?key|apikey)\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/gi,
        /(password|passwd|pwd)\s*[:=]\s*['"][^'"]{8,}['"]/gi,
        /(secret|token)\s*[:=]\s*['"][a-zA-Z0-9+/=]{20,}['"]/gi,
        /(aws_access_key_id|aws_secret_access_key)\s*[:=]\s*['"][^'"]+['"]/gi,
      ];

      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(context.content)) !== null) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.CRITICAL,
            category: IssueCategory.SECURITY,
            rule: 'hardcoded-secrets',
            message: 'Hardcoded secret detected',
            description: 'Sensitive credentials should not be hardcoded in source code',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: '*** REDACTED ***',
            suggestion: 'Use environment variables or secure credential management',
            fixable: false,
            confidence: 90,
            references: [
              'https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password',
            ],
          });
        }
      });

      return issues;
    },
  },
  {
    id: 'xss-vulnerability',
    name: 'Cross-Site Scripting (XSS)',
    description: 'Detect potential XSS vulnerabilities',
    severity: Severity.CRITICAL,
    category: IssueCategory.SECURITY,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const patterns = [
        /\.innerHTML\s*=\s*(?!['"`])/g,
        /document\.write\s*\(/g,
        /dangerouslySetInnerHTML/g,
      ];

      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(context.content)) !== null) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.CRITICAL,
            category: IssueCategory.SECURITY,
            rule: 'xss-vulnerability',
            message: 'Potential XSS vulnerability detected',
            description: 'Directly setting HTML content can lead to XSS attacks',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Use textContent, or sanitize HTML with DOMPurify',
            fixable: false,
            confidence: 80,
            references: ['https://owasp.org/www-community/attacks/xss/'],
          });
        }
      });

      return issues;
    },
  },
];

export default securityRules;
