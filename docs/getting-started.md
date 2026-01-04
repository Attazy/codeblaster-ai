# Getting Started with CodeBlaster AI

## Installation

### Global Installation
```bash
npm install -g @codeblaster/cli
```

### Project Installation
```bash
npm install --save-dev @codeblaster/cli
```

### Using npx (No Installation Required)
```bash
npx @codeblaster/cli review
```

## Quick Start

### 1. Initialize Configuration
```bash
codeblaster init
```

This will guide you through:
- Selecting AI provider (OpenAI, Anthropic, Ollama)
- Setting up API keys
- Configuring analysis rules
- Setting severity thresholds

### 2. Review Your Code

#### Review entire project:
```bash
codeblaster review
```

#### Review specific file:
```bash
codeblaster review src/index.js
```

#### Review directory:
```bash
codeblaster review src/
```

#### Review git staged changes:
```bash
codeblaster review --staged
```

### 3. Advanced Options

#### Specify AI provider:
```bash
codeblaster review --ai anthropic --model claude-3-5-sonnet-20241022
```

#### Set minimum severity:
```bash
codeblaster review --severity error
```

#### Generate HTML report:
```bash
codeblaster review --format html --output report.html
```

#### Enable auto-fix:
```bash
codeblaster review --fix
```

## Configuration

### .codeblaster.json

Create this file in your project root:

```json
{
  "version": "1.0.0",
  "ai": {
    "provider": "openai",
    "model": "gpt-4-turbo-preview"
  },
  "analysis": {
    "severity": "warning",
    "rules": ["security", "performance", "code-quality"],
    "parallel": true,
    "cache": true
  },
  "ignore": [
    "node_modules/**",
    "dist/**",
    "*.min.js"
  ]
}
```

### Environment Variables

Create a `.env` file:

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Ollama (local)
OLLAMA_BASE_URL=http://localhost:11434
```

## GitHub Actions Integration

Create `.github/workflows/code-review.yml`:

```yaml
name: Code Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Run CodeBlaster
        run: npx @codeblaster/cli review --staged
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Pre-commit Hook

Install husky:
```bash
npm install --save-dev husky
npx husky install
```

Create `.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx codeblaster review --staged --severity error
```

## CI/CD Integration

### Jenkins
```groovy
stage('Code Review') {
  steps {
    sh 'npx @codeblaster/cli review --format json --output report.json'
    publishHTML([
      reportDir: '.',
      reportFiles: 'report.json',
      reportName: 'CodeBlaster Report'
    ])
  }
}
```

### GitLab CI
```yaml
code-review:
  script:
    - npm install -g @codeblaster/cli
    - codeblaster review --format json --output report.json
  artifacts:
    reports:
      junit: report.json
```

## Next Steps

- [Configuration Guide](./configuration.md)
- [Plugin Development](./plugins.md)
- [API Reference](./api-reference.md)
- [Examples](../examples/)
