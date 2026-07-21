// ============================================================
// AUTH TYPES — Spring Boot Integration Ready
// ============================================================

// ─── Roles & Permissions ────────────────────────────────────

export type UserRole = 'owner' | 'admin' | 'developer' | 'viewer' | 'guest';

export type Permission =
  | 'workspace:manage'
  | 'workspace:delete'
  | 'members:invite'
  | 'members:remove'
  | 'members:view'
  | 'projects:create'
  | 'projects:delete'
  | 'projects:edit'
  | 'projects:view'
  | 'tasks:create'
  | 'tasks:delete'
  | 'tasks:edit'
  | 'tasks:view'
  | 'analytics:view'
  | 'settings:manage'
  | 'billing:manage'
  | 'api:manage';

// Role → Permission mapping for frontend RBAC
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'workspace:manage',
    'workspace:delete',
    'members:invite',
    'members:remove',
    'members:view',
    'projects:create',
    'projects:delete',
    'projects:edit',
    'projects:view',
    'tasks:create',
    'tasks:delete',
    'tasks:edit',
    'tasks:view',
    'analytics:view',
    'settings:manage',
    'billing:manage',
    'api:manage',
  ],
  admin: [
    'workspace:manage',
    'members:invite',
    'members:remove',
    'members:view',
    'projects:create',
    'projects:delete',
    'projects:edit',
    'projects:view',
    'tasks:create',
    'tasks:delete',
    'tasks:edit',
    'tasks:view',
    'analytics:view',
    'settings:manage',
    'api:manage',
  ],
  developer: [
    'members:view',
    'projects:create',
    'projects:edit',
    'projects:view',
    'tasks:create',
    'tasks:edit',
    'tasks:view',
    'analytics:view',
    'api:manage',
  ],
  viewer: ['members:view', 'projects:view', 'tasks:view', 'analytics:view'],
  guest: ['projects:view', 'tasks:view'],
};

// ─── User ────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  /** Workspace-level role (set after workspace context is loaded) */
  workspaceRole?: UserRole;
}

// ─── Session ─────────────────────────────────────────────────

export interface Session {
  userId: string;
  workspaceId?: string;
  expiresAt: string; // ISO 8601
  issuedAt: string;
  deviceInfo?: string;
}

// ─── Tokens ──────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: 'Bearer';
}

// ─── API Response Shapes ─────────────────────────────────────

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  session: Session;
  requiresWorkspace?: boolean; // true when user has no workspace yet
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  timestamp: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  fieldErrors?: Record<string, string>; // For form validation errors from backend
}

// ─── Auth DTOs (Data Transfer Objects) ───────────────────────

export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailDto {
  token: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// ─── OAuth ───────────────────────────────────────────────────

export type OAuthProvider = 'google' | 'github' | 'microsoft';

export interface OAuthInitDto {
  provider: OAuthProvider;
  redirectUri: string;
}
