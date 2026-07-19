import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'member' | 'guest';
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem('devforge_auth_token', token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem('devforge_auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'devforge-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Only persist safe data, not tokens if security-sensitive
    }
  )
);
