import { apiClient } from './apiClient';
import { useNotificationStore } from '@store/index';

export interface PendingMutation {
  id: string;
  type: 'todo' | 'bookmark' | 'preference' | 'pomodoro';
  action: 'create' | 'update' | 'delete' | 'sync';
  payload: any;
  timestamp: number;
}

const STORAGE_KEY = 'nova_offline_queue';

export class SyncManager {
  private static isOnline = navigator.onLine;

  static init() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      useNotificationStore.getState().addNotification({
        title: 'Network Restored',
        message: 'Reconnected to cloud. Synchronizing offline changes...',
        type: 'info',
      });
      this.flushQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      useNotificationStore.getState().addNotification({
        title: 'Offline Mode Active',
        message: 'Changes will be saved locally and synchronized when online.',
        type: 'warning',
      });
    });

    if (this.isOnline) {
      this.flushQueue();
    }
  }

  static getQueue(): PendingMutation[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static saveQueue(queue: PendingMutation[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  }

  static enqueue(mutation: Omit<PendingMutation, 'id' | 'timestamp'>) {
    const queue = this.getQueue();
    const item: PendingMutation = {
      ...mutation,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    queue.push(item);
    this.saveQueue(queue);

    if (this.isOnline) {
      this.flushQueue();
    }
  }

  static async flushQueue() {
    const queue = this.getQueue();
    if (queue.length === 0) return;

    const remaining: PendingMutation[] = [];

    for (const mutation of queue) {
      try {
        if (mutation.type === 'todo') {
          if (mutation.action === 'create') {
            await apiClient.post('/todos', mutation.payload);
          } else if (mutation.action === 'update') {
            await apiClient.put(`/todos/${mutation.payload.id}`, mutation.payload);
          } else if (mutation.action === 'delete') {
            await apiClient.delete(`/todos/${mutation.payload.id}`);
          }
        } else if (mutation.type === 'bookmark') {
          if (mutation.action === 'create') {
            await apiClient.post('/bookmarks', mutation.payload);
          } else if (mutation.action === 'delete') {
            await apiClient.delete(`/bookmarks/${mutation.payload.id}`);
          }
        }
      } catch (err) {
        remaining.push(mutation);
      }
    }

    this.saveQueue(remaining);

    if (remaining.length === 0) {
      useNotificationStore.getState().addNotification({
        title: 'Cloud Sync Complete',
        message: 'All workspace changes synced successfully.',
        type: 'success',
      });
    }
  }
}
