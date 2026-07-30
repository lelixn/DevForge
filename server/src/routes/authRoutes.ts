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

router.post('/register', validateRequest(registerSchema), AuthController.register);
router.post('/login', validateRequest(loginSchema), AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticateJWT, AuthController.logout);
router.get('/me', authenticateJWT, AuthController.me);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), AuthController.resetPassword);

export default router;
