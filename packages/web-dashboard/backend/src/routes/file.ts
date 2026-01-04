import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const uploadDir = path.join(os.tmpdir(), 'codeblaster-uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowedExts = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.cpp', '.c', '.rb', '.php', '.cs', '.swift', '.kt'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'));
    }
  }
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const code = await fs.readFile(req.file.path, 'utf-8');

    return res.json({
      success: true,
      data: {
        filename: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
        code
      }
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'File upload failed'
    });
  }
});

router.post('/upload-multiple', upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const filesData = await Promise.all(
      req.files.map(async (file) => {
        const code = await fs.readFile(file.path, 'utf-8');
        return {
          filename: file.originalname,
          size: file.size,
          path: file.path,
          code
        };
      })
    );

    return res.json({
      success: true,
      data: {
        count: filesData.length,
        files: filesData
      }
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Multiple file upload failed'
    });
  }
});

router.delete('/cleanup/:filename', async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const uploadDir = path.join(os.tmpdir(), 'codeblaster-uploads');
    const filepath = path.join(uploadDir, filename);

    await fs.unlink(filepath);

    return res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'File cleanup failed'
    });
  }
});

export default router;
