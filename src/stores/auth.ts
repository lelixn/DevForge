import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, Permission, Session, AuthTokens } from '@/shared/types/auth.types';
import { ROLE_PERMISSIONS } from '@/shared/types/auth.types';
import type { Workspace } from '@/shared/types/workspace.types';

interface AuthState {
  // State
  user: User | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  permissions: Permission[];
  session: Session | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  setAuth: (payload: {
    user: User;
    tokens?: AuthTokens;
    session?: Session;
    workspace?: Workspace | null;
    workspaces?: Workspace[];
  }) => void;
  setTokens: (tokens: AuthTokens) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  updateUser: (userPartial: Partial<User>) => void;
  clearAuth: () => void;
  setInitialized: (initialized: boolean) => void;

  // Helper selectors
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentWorkspace: null,
      workspaces: [],
      permissions: [],
      session: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitialized: true,

      setAuth: ({ user, tokens, session, workspace, workspaces }) => {
        const role = workspace?.ownerId === user.id ? 'owner' : user.role || 'developer';
        const userPermissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.developer;

        if (tokens) {
          localStorage.setItem('devforge_access_token', tokens.accessToken);
          localStorage.setItem('devforge_refresh_token', tokens.refreshToken);
        }

        set({
          user: { ...user, workspaceRole: role },
          currentWorkspace: workspace || null,
          workspaces: workspaces || (workspace ? [workspace] : []),
          permissions: userPermissions,
          session: session || null,
          accessToken: tokens?.accessToken || get().accessToken,
          refreshToken: tokens?.refreshToken || get().refreshToken,
          isAuthenticated: true,
        });
      },

      setTokens: (tokens) => {
        localStorage.setItem('devforge_access_token', tokens.accessToken);
        localStorage.setItem('devforge_refresh_token', tokens.refreshToken);
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },

      setCurrentWorkspace: (workspace) => {
        const user = get().user;
        let role = user?.role || 'developer';
        if (workspace && user) {
          role = workspace.ownerId === user.id ? 'owner' : user.role;
        }
        const userPermissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.developer;

        set({
          currentWorkspace: workspace,
          user: user ? { ...user, workspaceRole: role } : null,
          permissions: userPermissions,
        });
      },

      setWorkspaces: (workspaces) => {
        set({ workspaces });
      },

      updateUser: (userPartial) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...userPartial } });
      },

      clearAuth: () => {
        localStorage.removeItem('devforge_access_token');
        localStorage.removeItem('devforge_refresh_token');
        localStorage.removeItem('devforge_auth_token');
        set({
          user: null,
          currentWorkspace: null,
          workspaces: [],
          permissions: [],
          session: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      setInitialized: (initialized) => {
        set({ isInitialized: initialized });
      },

      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },

      hasRole: (role) => {
        const { user } = get();
        if (!user) return false;
        const currentRole = user.workspaceRole || user.role;
        if (Array.isArray(role)) {
          return role.includes(currentRole);
        }
        return currentRole === role;
      },
    }),
    {
      name: 'devforge-auth-storage',
      partialize: (state) => ({
        user: state.user,
        currentWorkspace: state.currentWorkspace,
        workspaces: state.workspaces,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
