import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Clock, X, CheckCheck } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GlassCard } from '@/components/shared/glass-card';
import { Badge } from '@/components/shared/badge';
import { NOTIFICATIONS_DATA } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/notifications/')({ component: NotificationsPage });

const ICON_MAP = {
  success: { icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-[var(--df-success)]' },
  warning: { icon: <AlertCircle className="h-4 w-4" />, color: 'text-[var(--df-warning)]' },
  info: { icon: <Clock className="h-4 w-4" />, color: 'text-[var(--df-muted-fg)]' },
  error: { icon: <AlertCircle className="h-4 w-4" />, color: 'text-[var(--df-danger)]' },
};

function NotificationsPage() {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const categories = ['All', ...Array.from(new Set(NOTIFICATIONS_DATA.map((n) => n.category)))];
  const unread = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === 'All' ? notifications : notifications.filter((n) => n.category === filter);

  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications((p) => p.filter((n) => n.id !== id));

  const grouped = filtered.reduce<Record<string, typeof NOTIFICATIONS_DATA>>((acc, n) => {
    const group = n.read ? 'Earlier' : 'Unread';
    acc[group] = acc[group] || [];
    acc[group].push(n);
    return acc;
  }, {});

  return (
    <PageContainer>
      <PageHeader
        title="Notifications"
        description={`${unread} unread notification${unread !== 1 ? 's' : ''}`}
      >
        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--df-muted-fg)] transition-all hover:border-[var(--df-border-strong)] hover:text-[var(--df-fg)]"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          Mark all read
        </button>
      </PageHeader>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              filter === cat
                ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grouped notifications */}
      <div className="flex flex-col gap-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
                {group}
              </h2>
              {group === 'Unread' && (
                <Badge variant="primary" size="xs">
                  {items.length}
                </Badge>
              )}
            </div>
            <GlassCard className="p-0 overflow-hidden">
              {items.map((n, i) => {
                const icon = ICON_MAP[n.type as keyof typeof ICON_MAP];
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'group flex items-start gap-4 border-b border-[var(--df-border)] px-5 py-4 last:border-0 transition-all hover:bg-[var(--df-secondary)]/40',
                      !n.read && 'bg-[var(--df-primary)]/5'
                    )}
                  >
                    <span className={cn('mt-0.5 flex-shrink-0', icon.color)}>{icon.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            !n.read ? 'text-[var(--df-fg)]' : 'text-[var(--df-muted-fg)]'
                          )}
                        >
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--df-primary)]" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--df-muted-fg)]">{n.body}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Badge size="xs">{n.category}</Badge>
                        <span className="text-[10px] text-[var(--df-muted-fg)]">{n.time}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </GlassCard>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--df-border)] bg-[var(--df-secondary)] text-[var(--df-muted-fg)]">
              <Bell className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-[var(--df-fg)]">All caught up!</p>
            <p className="mt-1 text-xs text-[var(--df-muted-fg)]">
              No notifications in this category
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
