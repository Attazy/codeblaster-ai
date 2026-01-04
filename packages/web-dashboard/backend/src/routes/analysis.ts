import { Router } from 'express';
const router = Router();
router.post('/run', (_req, res) => res.json({ status: 'ok' }));
export default router;
