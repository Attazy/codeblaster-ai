// Example: Basic usage
import { CodeAnalyzer } from '@codeblaster/core';

const config = {
  language: 'javascript',
  rules: ['security', 'performance'],
  severity: 'warning',
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4-turbo-preview',
  },
  cache: {
    enabled: true,
    type: 'memory',
    ttl: 3600,
  },
  parallel: true,
};

async function main() {
  const analyzer = new CodeAnalyzer(config);
  
  // Analyze single file
  const issues = await analyzer.analyzeFile('./src/index.js');
  console.log(`Found ${issues.length} issues`);
  
  // Analyze directory
  const result = await analyzer.analyzeDirectory('./src');
  console.log(`Analyzed ${result.files} files`);
  console.log(`Critical: ${result.summary.critical}`);
  console.log(`Errors: ${result.summary.error}`);
  console.log(`Warnings: ${result.summary.warning}`);
  
  await analyzer.cleanup();
}

main();
