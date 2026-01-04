import { Router, Request, Response } from 'express';
import { CodeAnalyzer, Language, Severity } from '@codeblaster/core';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const router = Router();

interface ReviewRequest {
  code: string;
  filename: string;
  language?: string;
  options?: {
    consensus?: boolean;
    securityScan?: boolean;
  };
}

router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { code, filename, language }: ReviewRequest = req.body;

    if (!code || !filename) {
      return res.status(400).json({
        success: false,
        error: 'Code and filename are required'
      });
    }

    const io: Server = req.app.get('io');
    const socketId = req.headers['x-socket-id'] as string;

    // Emit start event
    if (socketId && io) {
      io.to(socketId).emit('review:start', { filename });
    }

    const detectedLang = language || detectLanguage(filename);

    // Initialize analyzer
    const analyzer = new CodeAnalyzer({
      language: detectedLang as Language,
      rules: [],
      severity: Severity.INFO,
      ai: {
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4',
        maxTokens: 2000,
        temperature: 0.3
      }
    });

    // Emit progress
    if (socketId && io) {
      io.to(socketId).emit('review:progress', { 
        filename, 
        status: 'Analyzing code...',
        progress: 30
      });
    }

    // Write temp file for analysis
    const tempDir = path.join(os.tmpdir(), 'codeblaster-analysis');
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = path.join(tempDir, filename);
    await fs.writeFile(tempFile, code, 'utf-8');

    // Analyze code
    const issues = await analyzer.analyzeFile(tempFile);

    // Clean up temp file
    await fs.unlink(tempFile).catch(() => {});

    // Emit progress
    if (socketId && io) {
      io.to(socketId).emit('review:progress', { 
        filename, 
        status: 'Generating report...',
        progress: 80
      });
    }

    // Calculate statistics
    const stats = {
      totalIssues: issues.length,
      critical: issues.filter((i: any) => i.severity === 'critical').length,
      high: issues.filter((i: any) => i.severity === 'error').length,
      medium: issues.filter((i: any) => i.severity === 'warning').length,
      low: issues.filter((i: any) => i.severity === 'info').length,
      score: calculateScore(issues)
    };

    // Format issues for frontend
    const formattedIssues = issues.map((issue: any) => ({
      type: issue.rule,
      severity: mapSeverity(issue.severity),
      message: issue.message,
      line: issue.line,
      column: issue.column,
      suggestion: issue.suggestion
    }));

    // Emit complete
    if (socketId && io) {
      io.to(socketId).emit('review:complete', { 
        filename,
        stats
      });
    }

    return res.json({
      success: true,
      data: {
        filename,
        language: detectedLang,
        stats,
        issues: formattedIssues,
        suggestions: [],
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Review error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Analysis failed'
    });
  }
});

router.post('/file', async (_req: Request, res: Response) => {
  try {
    const { filepath, options = {} } = _req.body;

    if (!filepath) {
      return res.status(400).json({
        success: false,
        error: 'Filepath is required'
      });
    }

    // Read file
    const code = await fs.readFile(filepath, 'utf-8');
    const filename = path.basename(filepath);

    // Forward to analyze
    _req.body = {
      code,
      filename,
      options
    };

    return res.status(501).json({
      success: false,
      error: 'File path analysis not yet implemented - use upload instead'
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'File analysis failed'
    });
  }
});

router.post('/batch', async (_req: Request, res: Response) => {
  try {
    const { files } = _req.body;

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({
        success: false,
        error: 'Files array is required'
      });
    }

    const io: Server = _req.app.get('io');
    const socketId = _req.headers['x-socket-id'] as string;

    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (socketId && io) {
        io.to(socketId).emit('batch:progress', {
          current: i + 1,
          total: files.length,
          filename: file.filename
        });
      }

      const analyzer = new CodeAnalyzer({
        language: detectLanguage(file.filename) as Language,
        rules: [],
        severity: Severity.INFO,
        ai: {
          provider: 'openai',
          apiKey: process.env.OPENAI_API_KEY || '',
          model: 'gpt-4'
        }
      });

      const tempDir = path.join(os.tmpdir(), 'codeblaster-batch');
      await fs.mkdir(tempDir, { recursive: true });
      const tempFile = path.join(tempDir, file.filename);
      await fs.writeFile(tempFile, file.code, 'utf-8');

      const issues = await analyzer.analyzeFile(tempFile);
      await fs.unlink(tempFile).catch(() => {});

      results.push({
        filename: file.filename,
        issues: issues.length,
        score: calculateScore(issues)
      });
    }

    return res.json({
      success: true,
      data: {
        totalFiles: files.length,
        results,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Batch analysis failed'
    });
  }
});

function mapSeverity(severity: string): string {
  const map: Record<string, string> = {
    'critical': 'critical',
    'error': 'high',
    'warning': 'medium',
    'info': 'low'
  };
  return map[severity] || 'low';
}

function detectLanguage(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const langMap: Record<string, string> = {
    '.js': 'javascript',
    '.ts': 'typescript',
    '.jsx': 'javascript',
    '.tsx': 'typescript',
    '.py': 'python',
    '.java': 'java',
    '.go': 'go',
    '.rs': 'rust',
    '.cpp': 'cpp',
    '.c': 'c',
    '.rb': 'ruby',
    '.php': 'php',
    '.cs': 'csharp',
    '.swift': 'swift',
    '.kt': 'kotlin'
  };
  return langMap[ext] || 'javascript';
}

function calculateScore(issues: any[]): number {
  const weights: Record<string, number> = { 
    critical: 10, 
    error: 5, 
    warning: 2, 
    info: 1 
  };
  const totalPenalty = issues.reduce((sum, issue) => {
    return sum + (weights[issue.severity] || 0);
  }, 0);
  return Math.max(0, 100 - totalPenalty);
}

export default router;
