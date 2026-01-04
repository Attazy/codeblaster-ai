# Plugin Development Guide

## Creating a Custom Plugin

Plugins allow you to extend CodeBlaster with custom rules and analyzers.

### Plugin Structure

```typescript
import { Plugin, Rule, RuleContext, AnalysisIssue } from '@codeblaster/core';

const myCustomRule: Rule = {
  id: 'my-custom-rule',
  name: 'My Custom Rule',
  description: 'Detects specific patterns in code',
  severity: 'warning',
  category: 'best_practice',
  language: ['javascript', 'typescript'],
  enabled: true,
  check: (context: RuleContext): AnalysisIssue[] => {
    const issues: AnalysisIssue[] = [];
    
    // Your analysis logic here
    const pattern = /your-pattern/g;
    let match;
    
    while ((match = pattern.exec(context.content)) !== null) {
      const line = context.content.substring(0, match.index).split('\n').length;
      
      issues.push({
        id: crypto.randomUUID(),
        severity: 'warning',
        category: 'best_practice',
        rule: 'my-custom-rule',
        message: 'Custom rule violation detected',
        file: context.filePath,
        line,
        column: 0,
        codeSnippet: context.sourceCode.getLine(line),
        suggestion: 'How to fix this issue',
        fixable: false,
        confidence: 90,
      });
    }
    
    return issues;
  },
};

const plugin: Plugin = {
  name: 'my-plugin',
  version: '1.0.0',
  rules: [myCustomRule],
};

export default plugin;
```

### Loading Your Plugin

#### Option 1: Load from file
```typescript
import { CodeAnalyzer } from '@codeblaster/core';

const analyzer = new CodeAnalyzer(config);
await analyzer.pluginManager.loadPlugin('./path/to/plugin.js');
```

#### Option 2: Load from directory
```typescript
await analyzer.pluginManager.loadPluginsFromDirectory('./plugins');
```

### Example: React Best Practices Plugin

```typescript
import { Plugin, Rule } from '@codeblaster/core';

const noInlineStylesRule: Rule = {
  id: 'react-no-inline-styles',
  name: 'No Inline Styles',
  description: 'Avoid inline styles in React components',
  severity: 'warning',
  category: 'best_practice',
  language: ['javascript', 'typescript'],
  enabled: true,
  check: (context) => {
    const issues = [];
    const pattern = /<\w+\s+style={{/g;
    let match;
    
    while ((match = pattern.exec(context.content)) !== null) {
      const line = context.content.substring(0, match.index).split('\n').length;
      issues.push({
        id: crypto.randomUUID(),
        severity: 'warning',
        category: 'best_practice',
        rule: 'react-no-inline-styles',
        message: 'Inline styles detected',
        description: 'Use CSS modules or styled-components instead',
        file: context.filePath,
        line,
        column: 0,
        codeSnippet: context.sourceCode.getLine(line),
        suggestion: 'Extract to CSS file or use CSS-in-JS library',
        fixable: false,
        confidence: 95,
      });
    }
    
    return issues;
  },
};

const reactPlugin: Plugin = {
  name: 'react-best-practices',
  version: '1.0.0',
  rules: [noInlineStylesRule],
};

export default reactPlugin;
```

### Custom AI Analyzer

```typescript
import { CustomAnalyzer, AnalysisIssue } from '@codeblaster/core';

const customAnalyzer: CustomAnalyzer = {
  name: 'domain-specific-analyzer',
  analyze: async (file: string, content: string): Promise<AnalysisIssue[]> => {
    // Your custom analysis logic
    // Can use external services, databases, etc.
    
    return [];
  },
};
```

### Publishing Your Plugin

1. Create npm package:
```json
{
  "name": "@username/codeblaster-plugin-name",
  "version": "1.0.0",
  "keywords": ["codeblaster", "plugin"],
  "peerDependencies": {
    "@codeblaster/core": "^1.0.0"
  }
}
```

2. Publish:
```bash
npm publish --access public
```

3. Use:
```bash
npm install @username/codeblaster-plugin-name
```

```javascript
import plugin from '@username/codeblaster-plugin-name';
analyzer.pluginManager.loadPlugin(plugin);
```

## Community Plugins

- `@codeblaster/plugin-react` - React best practices
- `@codeblaster/plugin-vue` - Vue.js patterns
- `@codeblaster/plugin-angular` - Angular guidelines
- `@codeblaster/plugin-node` - Node.js security

Create your own and share with the community!
