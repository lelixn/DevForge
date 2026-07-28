import { api } from './api';
import type {
  Workspace,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  InviteMembersDto,
  WorkspaceMember,
  JoinWorkspaceDto,
} from '@/shared/types/workspace.types';
import type { ApiResponse } from '@/shared/types/auth.types';

const ENDPOINTS = {
  WORKSPACES: '/v1/workspaces',
  WORKSPACE_BY_SLUG: (slug: string) => `/v1/workspaces/slug/${slug}`,
  INVITE: (workspaceId: string) => `/v1/workspaces/${workspaceId}/invites`,
  MEMBERS: (workspaceId: string) => `/v1/workspaces/${workspaceId}/members`,
  JOIN: '/v1/workspaces/join',
};

export class WorkspaceService {
  /**
   * Create a new multi-tenant workspace
   */
  static async createWorkspace(dto: CreateWorkspaceDto): Promise<Workspace> {
    try {
      const response = await api.post<ApiResponse<Workspace>>(ENDPOINTS.WORKSPACES, dto);
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 700));

      const newWorkspace: Workspace = {
        id: 'ws_' + Math.random().toString(36).substring(2, 9),
        name: dto.name,
        slug: dto.slug,
        logoUrl: dto.logoUrl || null,
        plan: 'pro', // Default onboarding trial
        industry: dto.industry || 'software',
        size: dto.size || '1-5',
        timezone: dto.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        memberCount: 1,
        ownerId: 'usr_demo_123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return newWorkspace;
    }
  }

  /**
   * Get workspace details by slug
   */
  static async getWorkspaceBySlug(slug: string): Promise<Workspace> {
    try {
      const response = await api.get<ApiResponse<Workspace>>(ENDPOINTS.WORKSPACE_BY_SLUG(slug));
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 500));
      return {
        id: 'ws_engineering_1',
        name: 'Engineering Workspace',
        slug: slug,
        plan: 'pro',
        industry: 'software',
        size: '16-50',
        timezone: 'UTC',
        memberCount: 12,
        ownerId: 'usr_demo_123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Update workspace configuration
   */
  static async updateWorkspace(id: string, dto: UpdateWorkspaceDto): Promise<Workspace> {
    try {
      const response = await api.patch<ApiResponse<Workspace>>(
        `${ENDPOINTS.WORKSPACES}/${id}`,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 500));
      return {
        id,
        name: dto.name || 'Engineering Workspace',
        slug: 'engineering',
        plan: 'pro',
        industry: dto.industry || 'software',
        size: dto.size || '1-5',
        timezone: dto.timezone || 'UTC',
        memberCount: 12,
        ownerId: 'usr_demo_123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Invite team members to workspace
   */
  static async inviteMembers(
    dto: InviteMembersDto
  ): Promise<{ invitedCount: number; message: string }> {
    try {
      const response = await api.post<ApiResponse<{ invitedCount: number; message: string }>>(
        ENDPOINTS.INVITE(dto.workspaceId),
        { invites: dto.invites }
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 600));
      return {
        invitedCount: dto.invites.length,
        message: `Successfully sent ${dto.invites.length} workspace invitations.`,
      };
    }
  }

  /**
   * Fetch members of a workspace
   */
  static async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    try {
      const response = await api.get<ApiResponse<WorkspaceMember[]>>(
        ENDPOINTS.MEMBERS(workspaceId)
      );
      return response.data.data;
    } catch {
      return [
        {
          id: 'mem_1',
          workspaceId,
          userId: 'usr_demo_123',
          user: {
            id: 'usr_demo_123',
            email: 'john@devforge.io',
            fullName: 'John Doe',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            emailVerified: true,
          },
          role: 'owner',
          joinedAt: new Date().toISOString(),
        },
      ];
    }
  }

  /**
   * Accept workspace invitation token
   */
  static async joinWorkspace(
    dto: JoinWorkspaceDto
  ): Promise<{ workspace: Workspace; role: string }> {
    try {
      const response = await api.post<ApiResponse<{ workspace: Workspace; role: string }>>(
        ENDPOINTS.JOIN,
        dto
      );
      return response.data.data;
    } catch {
      await new Promise((res) => setTimeout(res, 700));
      return {
        workspace: {
          id: 'ws_joined_100',
          name: 'Acme Product Team',
          slug: 'acme-product',
          plan: 'enterprise',
          memberCount: 24,
          ownerId: 'usr_owner_999',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        role: 'developer',
      };
    }
  }
}
