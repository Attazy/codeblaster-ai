// Example: Custom rules
import { CodeAnalyzer, Rule, RuleContext } from '@codeblaster/core';

// Define custom rule
const noTodoCommentsRule: Rule = {
  id: 'no-todo-comments',
  name: 'No TODO Comments',
  description: 'TODO comments should be tracked in issue tracker',
  severity: 'info',
  category: 'best_practice',
  language: ['javascript', 'typescript', 'python'],
  enabled: true,
  check: (context: RuleContext) => {
    const issues = [];
    const pattern = /\/\/\s*TODO:/gi;
    let match;
    
    while ((match = pattern.exec(context.content)) !== null) {
      const line = context.content.substring(0, match.index).split('\n').length;
      issues.push({
        id: crypto.randomUUID(),
        severity: 'info',
        category: 'best_practice',
        rule: 'no-todo-comments',
        message: 'TODO comment found',
        description: 'Create a proper issue instead of leaving TODO comments',
        file: context.filePath,
        line,
        column: 0,
        codeSnippet: context.sourceCode.getLine(line),
        suggestion: 'Create an issue in your issue tracker',
        fixable: false,
        confidence: 100,
      });
    }
    
    return issues;
  },
};

async function main() {
  const analyzer = new CodeAnalyzer({
    language: 'javascript',
    rules: [],
    severity: 'info',
    ai: { provider: 'openai', apiKey: process.env.OPENAI_API_KEY!, model: 'gpt-4' },
  });
  
  // Add custom rule
  analyzer.pluginManager.getAllRules().push(noTodoCommentsRule);
  
  const result = await analyzer.analyzeDirectory('./src');
  console.log(result);
  
  await analyzer.cleanup();
}

main();
