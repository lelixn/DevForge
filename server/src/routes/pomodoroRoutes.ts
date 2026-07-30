import { Router } from 'express';
import { logSession, getStats } from '../controllers/pomodoroController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.post('/log', logSession as any);
router.get('/stats', getStats as any);

export default router;
