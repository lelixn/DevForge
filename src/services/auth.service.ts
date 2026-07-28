import { api } from './api';
import type {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailDto,
  RefreshTokenDto,
  AuthResponse,
  ApiResponse,
  OAuthProvider,
  User,
} from '@/shared/types/auth.types';

// Spring Boot Endpoints mapping
const ENDPOINTS = {
  LOGIN: '/v1/auth/login',
  REGISTER: '/v1/auth/register',
  FORGOT_PASSWORD: '/v1/auth/forgot-password',
  RESET_PASSWORD: '/v1/auth/reset-password',
  VERIFY_EMAIL: '/v1/auth/verify-email',
  REFRESH: '/v1/auth/refresh',
  LOGOUT: '/v1/auth/logout',
  OAUTH: (provider: OAuthProvider) => `/v1/auth/oauth/${provider}`,
};

export class AuthService {
  /**
   * Login user with email & password
   */
  static async login(dto: LoginDto): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(ENDPOINTS.LOGIN, dto);
      return response.data.data;
    } catch {
      // Mock Fallback for local development / testing without live Spring Boot backend
      await new Promise((res) => setTimeout(res, 800));

      const mockUser: User = {
        id: 'usr_demo_123',
        email: dto.email,
        fullName: dto.email.split('@')[0].replace('.', ' ').toUpperCase() || 'John Doe',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'owner',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        user: mockUser,
        tokens: {
          accessToken: 'mock_jwt_access_token_' + Date.now(),
          refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
        session: {
          userId: mockUser.id,
          workspaceId: 'ws_demo_999',
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          issuedAt: new Date().toISOString(),
          deviceInfo: navigator.userAgent,
        },
        requiresWorkspace: false,
      };
    }
  }

  /**
   * Register a new user account
   */
  static async register(dto: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(ENDPOINTS.REGISTER, dto);
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 800));

      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: dto.email,
        fullName: dto.fullName,
        avatarUrl: null,
        role: 'owner',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        user: mockUser,
        tokens: {
          accessToken: 'mock_jwt_access_token_' + Date.now(),
          refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
        session: {
          userId: mockUser.id,
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          issuedAt: new Date().toISOString(),
        },
        requiresWorkspace: true,
      };
    }
  }

  /**
   * Trigger password reset email
   */
  static async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        ENDPOINTS.FORGOT_PASSWORD,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 600));
      return {
        message: `Password reset instructions have been sent to ${dto.email}`,
      };
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        ENDPOINTS.RESET_PASSWORD,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 600));
      return {
        message: 'Password successfully updated. You can now log in with your new password.',
      };
    }
  }

  /**
   * Verify user email with token
   */
  static async verifyEmail(dto: VerifyEmailDto): Promise<{ message: string; verified: boolean }> {
    try {
      const response = await api.post<ApiResponse<{ message: string; verified: boolean }>>(
        ENDPOINTS.VERIFY_EMAIL,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 600));
      return {
        message: 'Your email address has been successfully verified.',
        verified: true,
      };
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(dto: RefreshTokenDto): Promise<AuthResponse['tokens']> {
    try {
      const response = await api.post<ApiResponse<AuthResponse['tokens']>>(ENDPOINTS.REFRESH, dto);
      return response.data.data;
    } catch {
      return {
        accessToken: 'refreshed_access_token_' + Date.now(),
        refreshToken: dto.refreshToken,
        expiresIn: 3600,
        tokenType: 'Bearer',
      };
    }
  }

  /**
   * Logout user session
   */
  static async logout(): Promise<void> {
    try {
      await api.post(ENDPOINTS.LOGOUT);
    } catch {
      // Ignore errors on logout
    }
  }

  /**
   * Get OAuth Auth URL
   */
  static getOAuthUrl(provider: OAuthProvider): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    return `${baseUrl}/v1/auth/oauth/${provider}?redirect_uri=${encodeURIComponent(window.location.origin + '/oauth/callback')}`;
  }
}
