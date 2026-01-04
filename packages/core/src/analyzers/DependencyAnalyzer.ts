import { AnalysisIssue, Severity, IssueCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface DependencyInfo {
  name: string;
  version: string;
  vulnerabilities: Vulnerability[];
  outdated: boolean;
  license: string;
}

export interface Vulnerability {
  severity: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  description: string;
  affectedVersions: string;
  patchedVersions: string;
  cve?: string;
  url?: string;
}

export class DependencyAnalyzer {
  async analyzeDependencies(projectPath: string): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    try {
      // Check package.json
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

      // Analyze dependencies
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      for (const [name, version] of Object.entries(dependencies)) {
        const depIssues = await this.checkDependency(name, version as string, packageJsonPath);
        issues.push(...depIssues);
      }

      // Check for known vulnerable packages
      const vulnerablePackages = await this.checkVulnerabilities(dependencies);
      issues.push(...vulnerablePackages);

      // Check licenses
      const licenseIssues = await this.checkLicenses(dependencies, packageJsonPath);
      issues.push(...licenseIssues);

    } catch (error) {
      console.warn('Could not analyze dependencies:', error);
    }

    return issues;
  }

  private async checkDependency(
    name: string,
    version: string,
    filePath: string
  ): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    // Check for deprecated packages
    const deprecatedPackages = [
      'request', 'node-uuid', 'coffee-script', 'colors',
      'faker', 'moment', // Suggest alternatives
    ];

    if (deprecatedPackages.includes(name)) {
      issues.push({
        id: uuidv4(),
        severity: Severity.WARNING,
        category: IssueCategory.MAINTAINABILITY,
        rule: 'deprecated-dependency',
        message: `Package "${name}" is deprecated`,
        description: `This package is no longer maintained`,
        file: filePath,
        line: 1,
        column: 0,
        codeSnippet: `"${name}": "${version}"`,
        suggestion: this.getAlternative(name),
        fixable: false,
        confidence: 100,
      });
    }

    // Check for wildcard versions
    if (version.includes('*') || version.includes('x')) {
      issues.push({
        id: uuidv4(),
        severity: Severity.WARNING,
        category: IssueCategory.BEST_PRACTICE,
        rule: 'wildcard-version',
        message: `Wildcard version detected for "${name}"`,
        description: 'Using wildcard versions can lead to unexpected breaking changes',
        file: filePath,
        line: 1,
        column: 0,
        codeSnippet: `"${name}": "${version}"`,
        suggestion: 'Use specific version or version range',
        fixable: false,
        confidence: 95,
      });
    }

    return issues;
  }

  private async checkVulnerabilities(
    dependencies: Record<string, string>
  ): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    // Known vulnerable packages (simplified - in real app, use npm audit API)
    const knownVulnerabilities: Record<string, Vulnerability[]> = {
      'lodash': [
        {
          severity: 'high',
          title: 'Prototype Pollution',
          description: 'Lodash versions before 4.17.21 are vulnerable',
          affectedVersions: '<4.17.21',
          patchedVersions: '>=4.17.21',
          cve: 'CVE-2021-23337',
          url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-23337',
        },
      ],
      'axios': [
        {
          severity: 'moderate',
          title: 'SSRF via URL parsing',
          description: 'Axios versions < 1.6.0 vulnerable to SSRF',
          affectedVersions: '<1.6.0',
          patchedVersions: '>=1.6.0',
          cve: 'CVE-2023-45857',
          url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-45857',
        },
      ],
    };

    for (const [name, version] of Object.entries(dependencies)) {
      if (knownVulnerabilities[name]) {
        const vulns = knownVulnerabilities[name];
        vulns.forEach((vuln) => {
          issues.push({
            id: uuidv4(),
            severity: this.mapVulnSeverity(vuln.severity),
            category: IssueCategory.SECURITY,
            rule: 'vulnerable-dependency',
            message: `${name} has known vulnerability: ${vuln.title}`,
            description: `${vuln.description}\nCVE: ${vuln.cve || 'N/A'}`,
            file: 'package.json',
            line: 1,
            column: 0,
            codeSnippet: `"${name}": "${version}"`,
            suggestion: `Update to ${vuln.patchedVersions}`,
            fixable: true,
            confidence: 100,
            references: vuln.url ? [vuln.url] : [],
          });
        });
      }
    }

    return issues;
  }

  private async checkLicenses(
    _dependencies: Record<string, string>,
    _filePath: string
  ): Promise<AnalysisIssue[]> {
    const issues: AnalysisIssue[] = [];

    // Problematic licenses for commercial use
    // const problematicLicenses = ['GPL', 'AGPL', 'LGPL'];

    // Note: In real implementation, fetch license info from npm registry
    // For now, just check common packages

    return issues;
  }

  private getAlternative(packageName: string): string {
    const alternatives: Record<string, string> = {
      'request': 'Use axios or node-fetch instead',
      'node-uuid': 'Use uuid package instead',
      'coffee-script': 'Migrate to JavaScript/TypeScript',
      'colors': 'Use chalk instead',
      'faker': 'Use @faker-js/faker instead',
      'moment': 'Use dayjs or date-fns instead (smaller bundle)',
    };

    return alternatives[packageName] || 'Find alternative package';
  }

  private mapVulnSeverity(severity: string): Severity {
    const map: Record<string, Severity> = {
      'low': Severity.INFO,
      'moderate': Severity.WARNING,
      'high': Severity.ERROR,
      'critical': Severity.CRITICAL,
    };
    return map[severity] || Severity.WARNING;
  }
}

export default DependencyAnalyzer;
