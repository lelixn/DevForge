import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
}

export const SIDEBAR_WIDTH_EXPANDED = 280;
export const SIDEBAR_WIDTH_COLLAPSED = 80;

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      mobileOpen: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
      setCollapsed: (v) => set({ collapsed: v }),
      setMobileOpen: (v) => set({ mobileOpen: v }),
    }),
    {
      name: 'devforge-sidebar',
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);
