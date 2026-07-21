// ============================================================
// WORKSPACE TYPES — Spring Boot Integration Ready
// ============================================================

import type { User, UserRole } from './auth.types';

// ─── Workspace ───────────────────────────────────────────────

export type WorkspacePlan = 'free' | 'pro' | 'enterprise';
export type WorkspaceIndustry =
  'software' | 'fintech' | 'healthcare' | 'ecommerce' | 'education' | 'media' | 'gaming' | 'other';
export type WorkspaceSize = '1-5' | '6-15' | '16-50' | '51-200' | '200+';

export interface Workspace {
  id: string;
  name: string;
  slug: string; // URL-safe identifier, e.g. "my-team"
  logoUrl?: string | null;
  plan: WorkspacePlan;
  industry?: WorkspaceIndustry;
  size?: WorkspaceSize;
  timezone?: string; // e.g. "Asia/Kolkata"
  memberCount: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Workspace Member ────────────────────────────────────────

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  user: Pick<User, 'id' | 'email' | 'fullName' | 'avatarUrl' | 'emailVerified'>;
  role: UserRole;
  joinedAt: string;
  invitedBy?: string;
}

// ─── Workspace Invite ────────────────────────────────────────

export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface WorkspaceInvite {
  id: string;
  workspaceId: string;
  email: string;
  role: UserRole;
  status: InviteStatus;
  token: string;
  expiresAt: string;
  invitedById: string;
  createdAt: string;
}

// ─── DTOs ────────────────────────────────────────────────────

export interface CreateWorkspaceDto {
  name: string;
  slug: string;
  logoUrl?: string;
  timezone?: string;
  size?: WorkspaceSize;
  industry?: WorkspaceIndustry;
}

export interface UpdateWorkspaceDto {
  name?: string;
  logoUrl?: string;
  timezone?: string;
  size?: WorkspaceSize;
  industry?: WorkspaceIndustry;
}

export interface InviteMemberDto {
  email: string;
  role: UserRole;
}

export interface InviteMembersDto {
  workspaceId: string;
  invites: InviteMemberDto[];
}

export interface JoinWorkspaceDto {
  token: string; // Invite token from email
}

export interface UpdateMemberRoleDto {
  memberId: string;
  role: UserRole;
}

// ─── Invite Form Shape ───────────────────────────────────────

/** For the invite members UI — before converting to DTO */
export interface InviteFormEntry {
  id: string; // Client-side UUID for list key
  email: string;
  role: UserRole;
  valid: boolean;
}
