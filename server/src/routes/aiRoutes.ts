import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();

router.post('/process', AIController.processAIRequest);

export default router;
