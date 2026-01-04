import { AnalysisResult, AnalysisIssue } from '@codeblaster/core';
import chalk from 'chalk';
import Table from 'cli-table3';
import boxen from 'boxen';

export class ConsoleReporter {
  generate(result: AnalysisResult): string {
    let output = '';

    // Header
    output += boxen(
      chalk.bold.blue('🚀 CodeBlaster AI - Analysis Report'),
      { padding: 1, margin: 1, borderStyle: 'round' }
    );

    output += '\n';

    // Summary
    const summaryTable = new Table({
      head: [chalk.bold('Metric'), chalk.bold('Value')],
      colWidths: [30, 15],
    });

    summaryTable.push(
      ['Files Analyzed', result.files.toString()],
      ['Total Issues', result.issues.length.toString()],
      [chalk.red('Critical'), result.summary.critical.toString()],
      [chalk.yellow('Errors'), result.summary.error.toString()],
      [chalk.cyan('Warnings'), result.summary.warning.toString()],
      [chalk.gray('Info'), result.summary.info.toString()],
      ['Duration', `${(result.duration / 1000).toFixed(2)}s`]
    );

    output += summaryTable.toString() + '\n\n';

    // Issues by severity
    if (result.issues.length > 0) {
      output += chalk.bold('📋 Issues by Severity:\n\n');

      const criticalIssues = result.issues.filter((i: AnalysisIssue) => i.severity === 'critical');
      const errorIssues = result.issues.filter((i: AnalysisIssue) => i.severity === 'error');
      const warningIssues = result.issues.filter((i: AnalysisIssue) => i.severity === 'warning');
      const infoIssues = result.issues.filter((i: AnalysisIssue) => i.severity === 'info');

      if (criticalIssues.length > 0) {
        output += chalk.red.bold('🔴 CRITICAL ISSUES:\n');
        criticalIssues.forEach((issue: AnalysisIssue) => {
          output += this.formatIssue(issue);
        });
      }

      if (errorIssues.length > 0) {
        output += chalk.red.bold('\n❌ ERRORS:\n');
        errorIssues.forEach((issue: AnalysisIssue) => {
          output += this.formatIssue(issue);
        });
      }

      if (warningIssues.length > 0) {
        output += chalk.yellow.bold('\n⚠️  WARNINGS:\n');
        warningIssues.slice(0, 10).forEach((issue: AnalysisIssue) => {
          output += this.formatIssue(issue);
        });
        if (warningIssues.length > 10) {
          output += chalk.gray(`  ... and ${warningIssues.length - 10} more warnings\n`);
        }
      }

      if (infoIssues.length > 0) {
        output += chalk.gray.bold(`\nℹ️  INFO: ${infoIssues.length} informational messages\n`);
      }
    } else {
      output += chalk.green.bold('✅ No issues found! Great job!\n');
    }

    // Footer
    output += '\n' + chalk.gray('─'.repeat(80)) + '\n';
    output += chalk.gray(`Generated at: ${result.timestamp.toLocaleString()}\n`);

    return output;
  }

  private formatIssue(issue: any): string {
    let output = '';
    output += chalk.bold(`  ${issue.message}\n`);
    output += chalk.gray(`    ${issue.file}:${issue.line}:${issue.column}\n`);
    output += chalk.dim(`    ${issue.codeSnippet}\n`);
    if (issue.suggestion) {
      output += chalk.green(`    💡 ${issue.suggestion}\n`);
    }
    if (issue.confidence) {
      output += chalk.gray(`    Confidence: ${issue.confidence}%\n`);
    }
    output += '\n';
    return output;
  }
}
