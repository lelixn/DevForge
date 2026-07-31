import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session } from '@/shared/types/auth.types';

export interface SessionState {
  session: Session | null;

  setSession: (session: Session | null) => void;
  clearSessionStore: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,

      setSession: (session) => set({ session }),
      clearSessionStore: () => set({ session: null }),
    }),
    {
      name: 'devforge-session-storage',
      partialize: (state) => ({ session: state.session }),
    }
  )
);
