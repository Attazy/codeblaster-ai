import { Router } from 'express';
import reviewRouter from './review';
import fileRouter from './file';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    name: 'CodeBlaster AI API',
    version: '1.0.0',
    endpoints: {
      review: '/api/review',
      file: '/api/file',
      health: '/health'
    }
  });
});

router.use('/review', reviewRouter);
router.use('/file', fileRouter);

export default router;
