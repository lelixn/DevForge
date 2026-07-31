import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth';
import { clearAllStores } from '@/stores';
import { AuthService } from '@/services/auth.service';
import { cancelAllPendingRequests } from '@/services/api/interceptor';
import { queryClient } from '@/app/providers';
import type {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/shared/types/auth.types';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth, user, isAuthenticated, currentWorkspace } = useAuthStore();

  /**
   * Handle user login
   */
  const login = async (dto: LoginDto, redirectTo?: string) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(dto);
      setAuth({
        user: response.user,
        tokens: response.tokens,
        session: response.session,
      });

      toast.success(`Welcome back, ${response.user.fullName}!`);

      if (response.requiresWorkspace) {
        navigate({ to: '/onboarding/create-workspace', replace: true });
      } else {
        const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';
        navigate({ to: target as string, replace: true });
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || 'Invalid email or password. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user registration
   */
  const register = async (dto: RegisterDto) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(dto);
      setAuth({
        user: response.user,
        tokens: response.tokens,
        session: response.session,
      });

      toast.success('Account created successfully!');
      navigate({ to: '/onboarding/create-workspace', replace: true });
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || 'Registration failed. Please check your information.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle forgot password
   */
  const forgotPassword = async (dto: ForgotPasswordDto) => {
    setIsLoading(true);
    try {
      const res = await AuthService.forgotPassword(dto);
      toast.success(res.message);
      return res;
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || 'Failed to send password reset email.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle reset password
   */
  const resetPassword = async (dto: ResetPasswordDto) => {
    setIsLoading(true);
    try {
      const res = await AuthService.resetPassword(dto);
      toast.success(res.message);
      navigate({ to: '/login', replace: true });
      return res;
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || 'Password reset failed. Link may be expired.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle atomic user logout (CASE 5)
   */
  const logout = async () => {
    try {
      // 1. Cancel pending API requests
      cancelAllPendingRequests();

      // 2. Call backend logout endpoint
      await AuthService.logout();
    } catch {
      // Ignore API logout errors
    } finally {
      // 3. Reset TanStack Query cache
      queryClient.clear();

      // 4. Atomically clear all Zustand stores, tokens, local/session storage & cookies
      clearAllStores();

      toast.info('You have been logged out.');

      // 5. Navigate to Landing Page replacing history stack so Browser Back doesn't return
      navigate({ to: '/landing', replace: true });
    }
  };

  return {
    user,
    isAuthenticated,
    currentWorkspace,
    isLoading,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}
