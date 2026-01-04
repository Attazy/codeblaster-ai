import chalk from 'chalk';
import fs from 'fs/promises';

export async function reportCommand(file: string, _options: { format: string }) {
  try {
    const content = await fs.readFile(file, 'utf-8');
    const report = JSON.parse(content);

    console.log(chalk.bold.blue('\n📊 Analysis Report\n'));
    console.log(chalk.gray(`Generated: ${report.timestamp}`));
    console.log(chalk.gray(`Files analyzed: ${report.files}`));
    console.log(chalk.gray(`Duration: ${report.duration}ms\n`));

    console.log(chalk.bold('Summary:'));
    console.log(chalk.red(`  Critical: ${report.summary.critical}`));
    console.log(chalk.yellow(`  Errors: ${report.summary.error}`));
    console.log(chalk.cyan(`  Warnings: ${report.summary.warning}`));
    console.log(chalk.gray(`  Info: ${report.summary.info}\n`));

    if (report.issues && report.issues.length > 0) {
      console.log(chalk.bold(`Top Issues (${Math.min(10, report.issues.length)}):\n`));
      report.issues.slice(0, 10).forEach((issue: any, i: number) => {
        const icon = getSeverityIcon(issue.severity);
        console.log(`${i + 1}. ${icon} ${issue.message}`);
        console.log(chalk.gray(`   ${issue.file}:${issue.line}`));
        if (issue.suggestion) {
          console.log(chalk.green(`   💡 ${issue.suggestion}`));
        }
        console.log();
      });
    }
  } catch (error: any) {
    console.error(chalk.red('Error reading report:'), error.message);
    process.exit(1);
  }
}

function getSeverityIcon(severity: string): string {
  const icons: Record<string, string> = {
    critical: '🔴',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };
  return icons[severity] || '•';
}
