import {
  Rule,
  RuleContext,
  AnalysisIssue,
  Severity,
  IssueCategory,
  Language,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export const performanceRules: Rule[] = [
  {
    id: 'inefficient-loop',
    name: 'Inefficient Loop Pattern',
    description: 'Detect inefficient looping patterns',
    severity: Severity.WARNING,
    category: IssueCategory.PERFORMANCE,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const pattern = /for\s*\(\s*let\s+\w+\s*=\s*0\s*;.*?\.length\s*;/g;
      let match;

      while ((match = pattern.exec(context.content)) !== null) {
        if (context.content.includes('.push(') || context.content.includes('.concat(')) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.WARNING,
            category: IssueCategory.PERFORMANCE,
            rule: 'inefficient-loop',
            message: 'Consider using array methods instead of loops',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Use map(), filter(), reduce() for better readability and performance',
            fixable: false,
            confidence: 70,
          });
        }
      }

      return issues;
    },
  },
  {
    id: 'memory-leak-listener',
    name: 'Potential Memory Leak',
    description: 'Event listeners added without removal',
    severity: Severity.ERROR,
    category: IssueCategory.PERFORMANCE,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const addListenerPattern = /addEventListener\s*\(/g;
      const removeListenerPattern = /removeEventListener\s*\(/g;

      const addMatches = context.content.match(addListenerPattern);
      const removeMatches = context.content.match(removeListenerPattern);

      if (addMatches && (!removeMatches || addMatches.length > removeMatches.length)) {
        let match;
        while ((match = addListenerPattern.exec(context.content)) !== null) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.ERROR,
            category: IssueCategory.PERFORMANCE,
            rule: 'memory-leak-listener',
            message: 'Event listener may not be removed',
            description: 'Missing removeEventListener can cause memory leaks',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: 'Ensure removeEventListener is called when component unmounts',
            fixable: false,
            confidence: 75,
          });
        }
      }

      return issues;
    },
  },
  {
    id: 'large-bundle-import',
    name: 'Large Package Import',
    description: 'Importing entire package instead of specific modules',
    severity: Severity.WARNING,
    category: IssueCategory.PERFORMANCE,
    language: [Language.JAVASCRIPT, Language.TYPESCRIPT],
    enabled: true,
    check: (context: RuleContext): AnalysisIssue[] => {
      const issues: AnalysisIssue[] = [];
      const packages = ['lodash', 'moment', 'rxjs'];
      
      packages.forEach((pkg) => {
        const pattern = new RegExp(`import\\s+\\w+\\s+from\\s+['"]${pkg}['"]`, 'g');
        let match;

        while ((match = pattern.exec(context.content)) !== null) {
          const line = context.content.substring(0, match.index).split('\n').length;
          issues.push({
            id: uuidv4(),
            severity: Severity.WARNING,
            category: IssueCategory.PERFORMANCE,
            rule: 'large-bundle-import',
            message: `Importing entire ${pkg} package`,
            description: 'This increases bundle size unnecessarily',
            file: context.filePath,
            line,
            column: match.index - context.content.lastIndexOf('\n', match.index),
            codeSnippet: context.sourceCode.getLine(line),
            suggestion: `Import only what you need: import { method } from '${pkg}/method'`,
            fixable: true,
            confidence: 95,
          });
        }
      });

      return issues;
    },
  },
];

export default performanceRules;
