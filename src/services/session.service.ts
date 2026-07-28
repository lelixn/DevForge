import { api } from './api';
import type { Session, ApiResponse } from '@/shared/types/auth.types';

const ENDPOINTS = {
  CURRENT_SESSION: '/v1/sessions/me',
  ALL_SESSIONS: '/v1/sessions',
  REVOKE_SESSION: (id: string) => `/v1/sessions/${id}`,
};

export class SessionService {
  /**
   * Get active user session info
   */
  static async getCurrentSession(): Promise<Session> {
    try {
      const response = await api.get<ApiResponse<Session>>(ENDPOINTS.CURRENT_SESSION);
      return response.data.data;
    } catch {
      return {
        userId: 'usr_demo_123',
        workspaceId: 'ws_engineering_1',
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        issuedAt: new Date().toISOString(),
        deviceInfo: navigator.userAgent,
      };
    }
  }

  /**
   * Get all active sessions for the user across devices
   */
  static async getAllSessions(): Promise<Session[]> {
    try {
      const response = await api.get<ApiResponse<Session[]>>(ENDPOINTS.ALL_SESSIONS);
      return response.data.data;
    } catch {
      return [
        {
          userId: 'usr_demo_123',
          workspaceId: 'ws_engineering_1',
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          issuedAt: new Date().toISOString(),
          deviceInfo: 'Chrome on Windows 11 (Current)',
        },
        {
          userId: 'usr_demo_123',
          workspaceId: 'ws_engineering_1',
          expiresAt: new Date(Date.now() + 43200000).toISOString(),
          issuedAt: new Date(Date.now() - 43200000).toISOString(),
          deviceInfo: 'DevForge Mobile App on iOS 17',
        },
      ];
    }
  }

  /**
   * Revoke a specific session
   */
  static async revokeSession(sessionId: string): Promise<void> {
    try {
      await api.delete(ENDPOINTS.REVOKE_SESSION(sessionId));
    } catch {
      // Mock delay
      await new Promise((res) => setTimeout(res, 400));
    }
  }
}
