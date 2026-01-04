import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

export async function initCommand() {
  console.log(chalk.bold.blue('\n🚀 CodeBlaster AI Configuration\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'aiProvider',
      message: 'Select AI provider:',
      choices: ['OpenAI', 'Anthropic', 'Ollama (Local)', 'Skip AI'],
      default: 'OpenAI',
    },
    {
      type: 'input',
      name: 'apiKey',
      message: 'Enter API key (leave empty to use environment variable):',
      when: (answers) => answers.aiProvider !== 'Ollama (Local)' && answers.aiProvider !== 'Skip AI',
    },
    {
      type: 'list',
      name: 'severity',
      message: 'Minimum severity level:',
      choices: ['info', 'warning', 'error', 'critical'],
      default: 'warning',
    },
    {
      type: 'checkbox',
      name: 'rules',
      message: 'Select rule categories:',
      choices: [
        { name: 'Security', value: 'security', checked: true },
        { name: 'Performance', value: 'performance', checked: true },
        { name: 'Code Quality', value: 'code-quality', checked: true },
        { name: 'Best Practices', value: 'best-practices', checked: true },
      ],
    },
    {
      type: 'confirm',
      name: 'parallel',
      message: 'Enable parallel processing?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'cache',
      message: 'Enable caching?',
      default: true,
    },
  ]);

  const config = {
    version: '1.0.0',
    ai: {
      provider: answers.aiProvider.toLowerCase().split(' ')[0],
      apiKey: answers.apiKey || undefined,
      model: getDefaultModel(answers.aiProvider),
    },
    analysis: {
      severity: answers.severity,
      rules: answers.rules,
      parallel: answers.parallel,
      cache: answers.cache,
    },
    ignore: ['node_modules/**', 'dist/**', 'build/**', '*.min.js'],
  };

  try {
    const configPath = path.join(process.cwd(), '.codeblaster.json');
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green('\n✓ Configuration saved to .codeblaster.json'));
    
    // Create .env template if API key provided
    if (answers.apiKey) {
      const envPath = path.join(process.cwd(), '.env');
      const envContent = `${getEnvVarName(answers.aiProvider)}=${answers.apiKey}\n`;
      await fs.appendFile(envPath, envContent);
      console.log(chalk.green('✓ API key added to .env'));
    }

    console.log(chalk.cyan('\n📝 Next steps:'));
    console.log('  1. Run: codeblaster review');
    console.log('  2. Or review specific file: codeblaster review src/index.js');
    console.log('  3. Review staged changes: codeblaster review --staged\n');
  } catch (error: any) {
    console.error(chalk.red('Error saving configuration:'), error.message);
    process.exit(1);
  }
}

function getDefaultModel(provider: string): string {
  const models: Record<string, string> = {
    openai: 'gpt-4-turbo-preview',
    anthropic: 'claude-3-5-sonnet-20241022',
    ollama: 'codellama',
  };
  return models[provider.toLowerCase()] || 'gpt-4-turbo-preview';
}

function getEnvVarName(provider: string): string {
  const envVars: Record<string, string> = {
    openai: 'OPENAI_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
  };
  return envVars[provider.toLowerCase()] || 'API_KEY';
}
