import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateMiddleware';
import { authenticateJWT } from '../middlewares/authMiddleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/authValidator';

const router = Router();

router.post('/register', validateRequest(registerSchema), AuthController.register as any);
router.post('/login', validateRequest(loginSchema), AuthController.login as any);
router.post('/refresh', AuthController.refreshToken as any);
router.post('/logout', authenticateJWT, AuthController.logout as any);
router.get('/me', authenticateJWT, AuthController.me as any);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword as any);
router.post('/reset-password', validateRequest(resetPasswordSchema), AuthController.resetPassword as any);

export default router;
