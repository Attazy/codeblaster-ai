import { AnalysisResult, AnalysisIssue } from '@codeblaster/core';

export class HTMLReporter {
  generate(result: AnalysisResult): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeBlaster AI - Analysis Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f7fa;
      padding: 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .header h1 { font-size: 32px; margin-bottom: 10px; }
    .header p { opacity: 0.9; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    .summary-card h3 { color: #666; font-size: 14px; margin-bottom: 10px; }
    .summary-card .value { font-size: 32px; font-weight: bold; }
    .critical { color: #e74c3c; }
    .error { color: #e67e22; }
    .warning { color: #f39c12; }
    .info { color: #3498db; }
    .issues {
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    .issue {
      border-left: 4px solid #ddd;
      padding: 20px;
      margin-bottom: 20px;
      background: #f9fafb;
      border-radius: 4px;
    }
    .issue.critical { border-left-color: #e74c3c; }
    .issue.error { border-left-color: #e67e22; }
    .issue.warning { border-left-color: #f39c12; }
    .issue.info { border-left-color: #3498db; }
    .issue-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .issue-title { font-weight: 600; font-size: 16px; }
    .issue-location { color: #666; font-size: 14px; margin-bottom: 10px; }
    .issue-code {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 4px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      overflow-x: auto;
      margin: 10px 0;
    }
    .issue-suggestion {
      background: #ecfdf5;
      border-left: 3px solid #10b981;
      padding: 12px;
      margin-top: 10px;
      border-radius: 4px;
      color: #065f46;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.critical { background: #fee2e2; color: #991b1b; }
    .badge.error { background: #fed7aa; color: #9a3412; }
    .badge.warning { background: #fef3c7; color: #92400e; }
    .badge.info { background: #dbeafe; color: #1e40af; }
    .footer {
      margin-top: 40px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 CodeBlaster AI</h1>
      <p>Analysis Report - ${result.timestamp.toLocaleString()}</p>
    </div>

    <div class="summary">
      <div class="summary-card">
        <h3>Files Analyzed</h3>
        <div class="value">${result.files}</div>
      </div>
      <div class="summary-card">
        <h3>Total Issues</h3>
        <div class="value">${result.issues.length}</div>
      </div>
      <div class="summary-card">
        <h3>Critical</h3>
        <div class="value critical">${result.summary.critical}</div>
      </div>
      <div class="summary-card">
        <h3>Errors</h3>
        <div class="value error">${result.summary.error}</div>
      </div>
      <div class="summary-card">
        <h3>Warnings</h3>
        <div class="value warning">${result.summary.warning}</div>
      </div>
      <div class="summary-card">
        <h3>Duration</h3>
        <div class="value">${(result.duration / 1000).toFixed(2)}s</div>
      </div>
    </div>

    <div class="issues">
      <h2 style="margin-bottom: 20px;">Issues Found</h2>
      ${result.issues.map((issue: AnalysisIssue) => `
        <div class="issue ${issue.severity}">
          <div class="issue-header">
            <div class="issue-title">${issue.message}</div>
            <span class="badge ${issue.severity}">${issue.severity}</span>
          </div>
          <div class="issue-location">📁 ${issue.file}:${issue.line}:${issue.column}</div>
          <div class="issue-code">${this.escapeHtml(issue.codeSnippet)}</div>
          ${issue.suggestion ? `
            <div class="issue-suggestion">
              💡 <strong>Suggestion:</strong> ${issue.suggestion}
            </div>
          ` : ''}
          ${issue.confidence ? `
            <div style="margin-top: 10px; color: #666; font-size: 13px;">
              Confidence: ${issue.confidence}%
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>

    <div class="footer">
      <p>Generated by CodeBlaster AI | Made with ❤️ by attazy</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
