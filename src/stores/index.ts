import { useAuthCoreStore } from './auth.store';
import { useWorkspaceStore } from './workspace.store';
import { useSessionStore } from './session.store';
import { usePermissionsStore } from './permissions.store';
import { clearTokens } from '@/services/api/token';

export * from './auth.store';
export * from './workspace.store';
export * from './session.store';
export * from './permissions.store';
export * from './sidebar';

/**
 * Placeholder cookie clearing function for frontend readiness
 */
export function clearAuthCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    if (name.startsWith('devforge_') || name.startsWith('auth_') || name.startsWith('JSESSIONID')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
}

/**
 * Atomically clear all application stores, storage, tokens, cookies, and cached states
 */
export function clearAllStores() {
  // Clear Zustand stores
  useAuthCoreStore.getState().clearAuthStore();
  useWorkspaceStore.getState().clearWorkspaceStore();
  useSessionStore.getState().clearSessionStore();
  usePermissionsStore.getState().clearPermissionsStore();

  // Clear Token abstractions
  clearTokens();

  // Clear Local and Session Storage
  try {
    const keysToRemove = [
      'devforge-auth-storage',
      'devforge-auth-core-storage',
      'devforge-workspace-storage',
      'devforge-session-storage',
      'devforge_access_token',
      'devforge_refresh_token',
      'devforge_auth_token',
    ];
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  } catch {
    // Storage access fallback
  }

  // Clear Cookies (placeholder)
  clearAuthCookies();
}
