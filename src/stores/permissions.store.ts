import { create } from 'zustand';
import type { Permission, UserRole } from '@/shared/types/auth.types';
import { ROLE_PERMISSIONS } from '@/shared/types/auth.types';

export interface PermissionsState {
  permissions: Permission[];

  setPermissions: (permissions: Permission[]) => void;
  updatePermissionsForRole: (role: UserRole) => void;
  clearPermissionsStore: () => void;
}

export const usePermissionsStore = create<PermissionsState>()((set) => ({
  permissions: [],

  setPermissions: (permissions) => set({ permissions }),
  updatePermissionsForRole: (role) => {
    const userPermissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.developer;
    set({ permissions: userPermissions });
  },
  clearPermissionsStore: () => set({ permissions: [] }),
}));

export function evaluatePermission(
  permissions: Permission[],
  required: Permission | Permission[]
): boolean {
  if (Array.isArray(required)) {
    return required.every((p) => permissions.includes(p));
  }
  return permissions.includes(required);
}

export function evaluateRole(
  currentRole: UserRole | undefined,
  requiredRole: UserRole | UserRole[]
): boolean {
  if (!currentRole) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(currentRole);
  }
  return currentRole === requiredRole;
}
