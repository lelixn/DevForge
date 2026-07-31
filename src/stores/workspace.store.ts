import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workspace } from '@/shared/types/workspace.types';

export interface WorkspaceState {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];

  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  clearWorkspaceStore: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      currentWorkspace: null,
      workspaces: [],

      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      setWorkspaces: (workspaces) => set({ workspaces }),
      clearWorkspaceStore: () => set({ currentWorkspace: null, workspaces: [] }),
    }),
    {
      name: 'devforge-workspace-storage',
      partialize: (state) => ({
        currentWorkspace: state.currentWorkspace,
        workspaces: state.workspaces,
      }),
    }
  )
);
