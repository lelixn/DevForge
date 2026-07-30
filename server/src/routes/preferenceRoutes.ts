import { Router } from 'express';
import { PreferenceController } from '../controllers/preferenceController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.get('/', PreferenceController.getPreferences as any);
router.put('/', PreferenceController.updatePreferences as any);

export default router;
