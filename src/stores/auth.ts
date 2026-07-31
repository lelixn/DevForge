import { useCallback } from 'react';
import { useAuthCoreStore } from './auth.store';
import { useWorkspaceStore } from './workspace.store';
import { useSessionStore } from './session.store';
import { usePermissionsStore, evaluatePermission, evaluateRole } from './permissions.store';
import { clearAllStores } from './index';
import type { User, UserRole, Permission, Session, AuthTokens } from '@/shared/types/auth.types';
import { ROLE_PERMISSIONS } from '@/shared/types/auth.types';
import type { Workspace } from '@/shared/types/workspace.types';

export interface AuthState {
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
  hasPermission: (permission: Permission | Permission[]) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

/**
 * Composite Auth Store hook maintaining backward compatibility
 * while delegating to modular Zustand stores with memoized stable actions.
 */
export const useAuthStore = (): AuthState => {
  const authCore = useAuthCoreStore();
  const workspaceState = useWorkspaceStore();
  const sessionState = useSessionStore();
  const permissionsState = usePermissionsStore();

  const setAuth = useCallback(
    ({
      user,
      tokens,
      session,
      workspace,
      workspaces,
    }: {
      user: User;
      tokens?: AuthTokens;
      session?: Session;
      workspace?: Workspace | null;
      workspaces?: Workspace[];
    }) => {
      const role = workspace?.ownerId === user.id ? 'owner' : user.role || 'developer';
      const userPermissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.developer;

      useAuthCoreStore.getState().setAuthData({ user: { ...user, workspaceRole: role }, tokens });
      if (session) useSessionStore.getState().setSession(session);
      useWorkspaceStore.getState().setCurrentWorkspace(workspace || null);
      useWorkspaceStore.getState().setWorkspaces(workspaces || (workspace ? [workspace] : []));
      usePermissionsStore.getState().setPermissions(userPermissions);
    },
    []
  );

  const setTokens = useCallback((tokens: AuthTokens) => {
    useAuthCoreStore.getState().setTokens(tokens);
  }, []);

  const setCurrentWorkspace = useCallback((workspace: Workspace | null) => {
    const user = useAuthCoreStore.getState().user;
    let role = user?.role || 'developer';
    if (workspace && user) {
      role = workspace.ownerId === user.id ? 'owner' : user.role;
    }
    const userPermissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.developer;

    useWorkspaceStore.getState().setCurrentWorkspace(workspace);
    if (user) {
      useAuthCoreStore.getState().updateUser({ workspaceRole: role });
    }
    usePermissionsStore.getState().setPermissions(userPermissions);
  }, []);

  const setWorkspaces = useCallback((workspaces: Workspace[]) => {
    useWorkspaceStore.getState().setWorkspaces(workspaces);
  }, []);

  const updateUser = useCallback((userPartial: Partial<User>) => {
    useAuthCoreStore.getState().updateUser(userPartial);
  }, []);

  const clearAuth = useCallback(() => {
    clearAllStores();
  }, []);

  const setInitialized = useCallback((initialized: boolean) => {
    useAuthCoreStore.getState().setInitialized(initialized);
  }, []);

  const hasPermission = useCallback(
    (permission: Permission | Permission[]) =>
      evaluatePermission(permissionsState.permissions, permission),
    [permissionsState.permissions]
  );

  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      const currentRole = authCore.user?.workspaceRole || authCore.user?.role;
      return evaluateRole(currentRole, role);
    },
    [authCore.user]
  );

  return {
    user: authCore.user,
    currentWorkspace: workspaceState.currentWorkspace,
    workspaces: workspaceState.workspaces,
    permissions: permissionsState.permissions,
    session: sessionState.session,
    accessToken: authCore.accessToken,
    refreshToken: authCore.refreshToken,
    isAuthenticated: authCore.isAuthenticated,
    isInitialized: authCore.isInitialized,

    setAuth,
    setTokens,
    setCurrentWorkspace,
    setWorkspaces,
    updateUser,
    clearAuth,
    setInitialized,
    hasPermission,
    hasRole,
  };
};

/**
 * Direct static state reader for route guards and non-React contexts
 */
useAuthStore.getState = () => {
  const authCore = useAuthCoreStore.getState();
  const workspaceState = useWorkspaceStore.getState();
  const sessionState = useSessionStore.getState();
  const permissionsState = usePermissionsStore.getState();

  const currentRole = authCore.user?.workspaceRole || authCore.user?.role;

  return {
    user: authCore.user,
    currentWorkspace: workspaceState.currentWorkspace,
    workspaces: workspaceState.workspaces,
    permissions: permissionsState.permissions,
    session: sessionState.session,
    accessToken: authCore.accessToken,
    refreshToken: authCore.refreshToken,
    isAuthenticated: authCore.isAuthenticated,
    isInitialized: authCore.isInitialized,
    clearAuth: () => clearAllStores(),
    hasPermission: (permission: Permission | Permission[]) =>
      evaluatePermission(permissionsState.permissions, permission),
    hasRole: (role: UserRole | UserRole[]) => evaluateRole(currentRole, role),
  };
};
