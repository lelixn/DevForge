import { describe, it, expect, beforeEach } from 'vitest';
import { SyncManager } from '../shared/services/syncManager';

describe('SyncManager Offline Queue', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should enqueue item when offline or mutation triggered', () => {
    SyncManager.enqueue({
      type: 'todo',
      action: 'create',
      payload: { id: 'test-1', title: 'Test Todo Item' },
    });

    const queue = SyncManager.getQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].payload.title).toBe('Test Todo Item');
  });

  it('should clear queue when flushed', () => {
    SyncManager.enqueue({
      type: 'bookmark',
      action: 'create',
      payload: { id: 'b1', title: 'GitHub', url: 'https://github.com' },
    });

    SyncManager.saveQueue([]);
    expect(SyncManager.getQueue().length).toBe(0);
  });
});
