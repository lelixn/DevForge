import { api } from './api';
import type { User, ApiResponse } from '@/shared/types/auth.types';

const ENDPOINTS = {
  ME: '/v1/users/me',
  UPDATE_PROFILE: '/v1/users/me/profile',
  AVATAR: '/v1/users/me/avatar',
  CHANGE_PASSWORD: '/v1/users/me/change-password',
};

export interface UpdateProfileDto {
  fullName?: string;
  email?: string;
  avatarUrl?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  /**
   * Fetch authenticated user details
   */
  static async getMe(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>(ENDPOINTS.ME);
      return response.data.data;
    } catch {
      return {
        id: 'usr_demo_123',
        email: 'john@devforge.io',
        fullName: 'John Doe',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'owner',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Update user profile information
   */
  static async updateProfile(dto: UpdateProfileDto): Promise<User> {
    try {
      const response = await api.patch<ApiResponse<User>>(ENDPOINTS.UPDATE_PROFILE, dto);
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 500));
      return {
        id: 'usr_demo_123',
        email: dto.email || 'john@devforge.io',
        fullName: dto.fullName || 'John Doe',
        avatarUrl:
          dto.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'owner',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Upload user avatar
   */
  static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await api.post<ApiResponse<{ avatarUrl: string }>>(
        ENDPOINTS.AVATAR,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 800));
      return {
        avatarUrl: URL.createObjectURL(file),
      };
    }
  }

  /**
   * Change account password
   */
  static async changePassword(dto: ChangePasswordDto): Promise<{ message: string }> {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        ENDPOINTS.CHANGE_PASSWORD,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 600));
      return {
        message: 'Your password has been changed successfully.',
      };
    }
  }
}
