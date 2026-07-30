import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Todo, SubTask } from '@shared/types';
import { generateId } from '@shared/utils';
import { SyncManager } from '@shared/services/syncManager';

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  restoreTodo: (todo: Todo) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => Todo | undefined;
  toggleTodo: (id: string) => void;
  addSubTask: (todoId: string, title: string) => void;
  toggleSubTask: (todoId: string, subtaskId: string) => void;
  reorderTodos: (todos: Todo[]) => void;
  clearCompleted: () => void;
  deleteBulk: (ids: string[]) => void;
  completeBulk: (ids: string[], completed: boolean) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (todo) => {
        const newTodo: Todo = {
          ...todo,
          id: generateId(),
          subtasks: todo.subtasks || [],
          recurring: todo.recurring || 'none',
          order: get().todos.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ todos: [...state.todos, newTodo] }));
        SyncManager.enqueue({ type: 'todo', action: 'create', payload: newTodo });
      },
      restoreTodo: (todo) => {
        set((state) => ({ todos: [...state.todos, todo] }));
        SyncManager.enqueue({ type: 'todo', action: 'create', payload: todo });
      },
      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
        const updated = get().todos.find((t) => t.id === id);
        if (updated) {
          SyncManager.enqueue({ type: 'todo', action: 'update', payload: updated });
        }
      },
      deleteTodo: (id) => {
        const target = get().todos.find((t) => t.id === id);
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
        if (target) {
          SyncManager.enqueue({ type: 'todo', action: 'delete', payload: { id } });
        }
        return target;
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
          ),
        }));
        const updated = get().todos.find((t) => t.id === id);
        if (updated) {
          SyncManager.enqueue({ type: 'todo', action: 'update', payload: updated });
        }
      },
      addSubTask: (todoId, title) => {
        const newSub: SubTask = { id: generateId(), title, completed: false };
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === todoId ? { ...t, subtasks: [...(t.subtasks || []), newSub] } : t
          ),
        }));
        const updated = get().todos.find((t) => t.id === todoId);
        if (updated) {
          SyncManager.enqueue({ type: 'todo', action: 'update', payload: updated });
        }
      },
      toggleSubTask: (todoId, subtaskId) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === todoId
              ? {
                  ...t,
                  subtasks: (t.subtasks || []).map((s) =>
                    s.id === subtaskId ? { ...s, completed: !s.completed } : s
                  ),
                }
              : t
          ),
        }));
        const updated = get().todos.find((t) => t.id === todoId);
        if (updated) {
          SyncManager.enqueue({ type: 'todo', action: 'update', payload: updated });
        }
      },
      reorderTodos: (todos) => set({ todos }),
      clearCompleted: () =>
        set((state) => ({ todos: state.todos.filter((t) => !t.completed) })),
      deleteBulk: (ids) =>
        set((state) => ({ todos: state.todos.filter((t) => !ids.includes(t.id)) })),
      completeBulk: (ids, completed) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            ids.includes(t.id) ? { ...t, completed, updatedAt: new Date().toISOString() } : t
          ),
        })),
    }),
    {
      name: 'nova-todos',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
