#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { reviewCommand } from './commands/review';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';
import { reportCommand } from './commands/report';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
  .name('codeblaster')
  .description('🚀 AI-Powered Code Review Assistant')
  .version('1.0.0');

// Review command
program
  .command('review [path]')
  .description('Analyze code and find issues')
  .option('-l, --language <lang>', 'Specify language (js, ts, py, java, go, rust)')
  .option('-a, --ai <provider>', 'AI provider (openai, anthropic, ollama)', 'openai')
  .option('-m, --model <model>', 'AI model to use')
  .option('-s, --severity <level>', 'Minimum severity (info, warning, error, critical)', 'info')
  .option('-f, --format <format>', 'Output format (console, json, html, markdown)', 'console')
  .option('-o, --output <file>', 'Output file path')
  .option('--staged', 'Only review staged git changes')
  .option('--fix', 'Auto-fix issues when possible')
  .option('--no-cache', 'Disable caching')
  .option('--parallel', 'Enable parallel processing', true)
  .action(reviewCommand);

// Init command
program
  .command('init')
  .description('Initialize CodeBlaster configuration')
  .action(initCommand);

// Config command
program
  .command('config')
  .description('Manage configuration')
  .option('--set <key=value>', 'Set configuration value')
  .option('--get <key>', 'Get configuration value')
  .option('--list', 'List all configuration')
  .action(configCommand);

// Report command
program
  .command('report <file>')
  .description('View analysis report')
  .option('-f, --format <format>', 'Format (console, html)', 'console')
  .action(reportCommand);

// GitHub integration
program
  .command('github')
  .description('GitHub integration commands')
  .option('--pr <number>', 'Review pull request')
  .option('--repo <owner/repo>', 'Repository')
  .option('--comment', 'Post comments on PR')
  .action(async (options) => {
    console.log(chalk.yellow('GitHub integration coming soon...'));
    console.log(options);
  });

program.parse();
