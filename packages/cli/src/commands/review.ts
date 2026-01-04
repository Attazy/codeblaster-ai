import { CodeAnalyzer, AnalyzerConfig, Language, Severity, AnalysisIssue } from '@codeblaster/core';
import chalk from 'chalk';
import ora from 'ora';
import { ConsoleReporter } from '../reporters/ConsoleReporter';
import { JSONReporter } from '../reporters/JSONReporter';
import { HTMLReporter } from '../reporters/HTMLReporter';
import fs from 'fs/promises';
import path from 'path';

interface ReviewOptions {
  language?: string;
  ai: string;
  model?: string;
  severity: string;
  format: string;
  output?: string;
  staged: boolean;
  fix: boolean;
  cache: boolean;
  parallel: boolean;
}

export async function reviewCommand(targetPath: string = '.', options: ReviewOptions) {
  const spinner = ora('Initializing code analysis...').start();

  try {
    const config: AnalyzerConfig = {
      language: parseLanguage(options.language),
      rules: [],
      severity: parseSeverity(options.severity),
      ai: {
        provider: options.ai as any,
        apiKey: getAPIKey(options.ai),
        model: options.model || getDefaultModel(options.ai),
        temperature: 0.3,
        maxTokens: 2000,
      },
      cache: {
        enabled: options.cache,
        type: 'memory',
        ttl: 3600,
      },
      parallel: options.parallel,
      maxConcurrency: 5,
    };

    spinner.text = 'Starting analysis...';
    const analyzer = new CodeAnalyzer(config);

    let result;
    if (options.staged) {
      spinner.text = 'Analyzing staged changes...';
      result = await analyzer.analyzeGitChanges(process.cwd());
    } else {
      const fullPath = path.resolve(targetPath);
      const stats = await fs.stat(fullPath);
      
      if (stats.isDirectory()) {
        spinner.text = `Analyzing directory: ${targetPath}`;
        result = await analyzer.analyzeDirectory(fullPath);
      } else {
        spinner.text = `Analyzing file: ${targetPath}`;
        const issues = await analyzer.analyzeFile(fullPath);
        result = {
          files: 1,
          issues,
          summary: {
            critical: issues.filter((i: AnalysisIssue) => i.severity === 'critical').length,
            error: issues.filter((i: AnalysisIssue) => i.severity === 'error').length,
            warning: issues.filter((i: AnalysisIssue) => i.severity === 'warning').length,
            info: issues.filter((i: AnalysisIssue) => i.severity === 'info').length,
          },
          duration: 0,
          timestamp: new Date(),
        };
      }
    }

    spinner.succeed(chalk.green('Analysis complete!'));

    // Generate report
    let reporter;
    switch (options.format) {
      case 'json':
        reporter = new JSONReporter();
        break;
      case 'html':
        reporter = new HTMLReporter();
        break;
      case 'console':
      default:
        reporter = new ConsoleReporter();
    }

    const report = reporter.generate(result);

    if (options.output) {
      await fs.writeFile(options.output, report);
      console.log(chalk.green(`\n✓ Report saved to: ${options.output}`));
    } else {
      console.log(report);
    }

    // Exit with error code if critical issues found
    if (result.summary.critical > 0 || result.summary.error > 0) {
      process.exit(1);
    }

    await analyzer.cleanup();
  } catch (error: any) {
    spinner.fail(chalk.red('Analysis failed'));
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

function parseLanguage(lang?: string): Language {
  const languageMap: Record<string, Language> = {
    js: Language.JAVASCRIPT,
    javascript: Language.JAVASCRIPT,
    ts: Language.TYPESCRIPT,
    typescript: Language.TYPESCRIPT,
    py: Language.PYTHON,
    python: Language.PYTHON,
    java: Language.JAVA,
    go: Language.GO,
    rust: Language.RUST,
    rs: Language.RUST,
  };

  return languageMap[lang?.toLowerCase() || 'javascript'] || Language.JAVASCRIPT;
}

function parseSeverity(severity: string): Severity {
  const severityMap: Record<string, Severity> = {
    info: Severity.INFO,
    warning: Severity.WARNING,
    error: Severity.ERROR,
    critical: Severity.CRITICAL,
  };

  return severityMap[severity.toLowerCase()] || Severity.INFO;
}

function getAPIKey(provider: string): string {
  const envVars: Record<string, string> = {
    openai: 'OPENAI_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
  };

  const envVar = envVars[provider];
  const apiKey = envVar ? process.env[envVar] : undefined;

  if (!apiKey && provider !== 'ollama') {
    console.warn(
      chalk.yellow(`Warning: ${envVar} not set. AI analysis may not work.`)
    );
  }

  return apiKey || '';
}

function getDefaultModel(provider: string): string {
  const models: Record<string, string> = {
    openai: 'gpt-4-turbo-preview',
    anthropic: 'claude-3-5-sonnet-20241022',
    ollama: 'codellama',
  };

  return models[provider] || 'gpt-4-turbo-preview';
}
