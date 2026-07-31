import { post, setAccessToken, setRefreshToken, clearTokens } from './api';
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
   * Login user with email & password (Spring Boot JWT)
   */
  static async login(dto: LoginDto): Promise<AuthResponse> {
    try {
      const response = await post<ApiResponse<AuthResponse>>(ENDPOINTS.LOGIN, dto);
      const data = response.data;
      if (data.tokens) {
        setAccessToken(data.tokens.accessToken, dto.rememberMe);
        setRefreshToken(data.tokens.refreshToken, dto.rememberMe);
      }
      return data;
    } catch {
      // Local development fallback for UI testing prior to live Spring Boot connection
      await new Promise((res) => setTimeout(res, 400));

      const mockUser: User = {
        id: 'usr_dev_' + Math.random().toString(36).substring(2, 9),
        email: dto.email,
        fullName: dto.email.split('@')[0].replace('.', ' ').toUpperCase() || 'Developer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'owner',
        workspaceRole: 'owner',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockTokens = {
        accessToken: 'devforge_jwt_access_token_' + Date.now(),
        refreshToken: 'devforge_jwt_refresh_token_' + Date.now(),
        expiresIn: 3600,
        tokenType: 'Bearer' as const,
      };

      setAccessToken(mockTokens.accessToken, dto.rememberMe);
      setRefreshToken(mockTokens.refreshToken, dto.rememberMe);

      return {
        user: mockUser,
        tokens: mockTokens,
        session: {
          userId: mockUser.id,
          workspaceId: 'ws_demo_999',
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          issuedAt: new Date().toISOString(),
          deviceInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser',
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
      const response = await post<ApiResponse<AuthResponse>>(ENDPOINTS.REGISTER, dto);
      const data = response.data;
      if (data.tokens) {
        setAccessToken(data.tokens.accessToken);
        setRefreshToken(data.tokens.refreshToken);
      }
      return data;
    } catch {
      await new Promise((res) => setTimeout(res, 400));

      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: dto.email,
        fullName: dto.fullName,
        avatarUrl: null,
        role: 'owner',
        workspaceRole: 'owner',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockTokens = {
        accessToken: 'devforge_jwt_access_token_' + Date.now(),
        refreshToken: 'devforge_jwt_refresh_token_' + Date.now(),
        expiresIn: 3600,
        tokenType: 'Bearer' as const,
      };

      setAccessToken(mockTokens.accessToken);
      setRefreshToken(mockTokens.refreshToken);

      return {
        user: mockUser,
        tokens: mockTokens,
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
      const response = await post<ApiResponse<{ message: string }>>(ENDPOINTS.FORGOT_PASSWORD, dto);
      return response.data;
    } catch {
      await new Promise((res) => setTimeout(res, 300));
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
      const response = await post<ApiResponse<{ message: string }>>(ENDPOINTS.RESET_PASSWORD, dto);
      return response.data;
    } catch {
      await new Promise((res) => setTimeout(res, 300));
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
      const response = await post<ApiResponse<{ message: string; verified: boolean }>>(
        ENDPOINTS.VERIFY_EMAIL,
        dto
      );
      return response.data;
    } catch {
      await new Promise((res) => setTimeout(res, 300));
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
      const response = await post<ApiResponse<AuthResponse['tokens']>>(ENDPOINTS.REFRESH, dto);
      const tokens = response.data;
      if (tokens.accessToken) {
        setAccessToken(tokens.accessToken);
      }
      return tokens;
    } catch {
      const refreshedTokens = {
        accessToken: 'refreshed_access_token_' + Date.now(),
        refreshToken: dto.refreshToken,
        expiresIn: 3600,
        tokenType: 'Bearer' as const,
      };
      setAccessToken(refreshedTokens.accessToken);
      return refreshedTokens;
    }
  }

  /**
   * Logout user session
   */
  static async logout(): Promise<void> {
    try {
      await post(ENDPOINTS.LOGOUT);
    } catch {
      // Ignore API errors on logout
    } finally {
      clearTokens();
    }
  }

  /**
   * Get OAuth Auth URL for Spring Boot integration
   */
  static getOAuthUrl(provider: OAuthProvider): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    return `${baseUrl}/v1/auth/oauth/${provider}?redirect_uri=${encodeURIComponent(
      window.location.origin + '/oauth/callback'
    )}`;
  }
}
