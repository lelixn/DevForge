import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthTokens } from '@/shared/types/auth.types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setAuthData: (payload: { user: User; tokens?: AuthTokens }) => void;
  setTokens: (tokens: AuthTokens) => void;
  updateUser: (userPartial: Partial<User>) => void;
  setInitialized: (initialized: boolean) => void;
  clearAuthStore: () => void;
}

export const useAuthCoreStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitialized: true,

      setAuthData: ({ user, tokens }) => {
        set((state) => ({
          user,
          accessToken: tokens?.accessToken || state.accessToken,
          refreshToken: tokens?.refreshToken || state.refreshToken,
          isAuthenticated: true,
          isInitialized: true,
        }));
      },

      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },

      updateUser: (userPartial) => {
        set((state) => (state.user ? { user: { ...state.user, ...userPartial } } : {}));
      },

      setInitialized: (initialized) => {
        set({ isInitialized: initialized });
      },

      clearAuthStore: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      },
    }),
    {
      name: 'devforge-auth-core-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
