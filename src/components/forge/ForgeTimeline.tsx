import { GitCommit, GitPullRequest, AlertCircle, ShieldCheck, Terminal } from 'lucide-react';
import { ForgeAvatar } from './ForgeAvatar';
import { ForgeBadge } from './ForgeBadge';
import { cn } from '@/utils/cn';

export interface TimelineItem {
  id: string | number;
  type: 'commit' | 'deploy' | 'issue' | 'pr' | 'alert';
  title: string;
  repo?: string;
  user: string;
  avatar?: string;
  timestamp: string;
  status?: string;
}

export interface ForgeTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const getItemIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'commit':
      return <GitCommit className="h-3.5 w-3.5 text-[var(--df-primary-light)]" />;
    case 'deploy':
      return <ShieldCheck className="h-3.5 w-3.5 text-[var(--df-success)]" />;
    case 'pr':
      return <GitPullRequest className="h-3.5 w-3.5 text-[var(--df-accent)]" />;
    case 'issue':
      return <Terminal className="h-3.5 w-3.5 text-[var(--df-warning)]" />;
    case 'alert':
      return <AlertCircle className="h-3.5 w-3.5 text-[var(--df-danger)]" />;
    default:
      return <GitCommit className="h-3.5 w-3.5 text-white" />;
  }
};

const ForgeTimeline = ({ items, className }: ForgeTimelineProps) => {
  return (
    <div className={cn('relative space-y-4 pl-4 border-l border-[var(--df-border)]', className)}>
      {items.map((item) => (
        <div key={item.id} className="relative flex items-start justify-between gap-4 group">
          {/* Node Dot */}
          <div className="absolute -left-[21px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--df-surface-elevated)] border border-[var(--df-border-strong)] group-hover:border-[var(--df-primary)] transition-colors">
            {getItemIcon(item.type)}
          </div>

          {/* Item Content */}
          <div className="flex items-start gap-3 min-w-0">
            <ForgeAvatar name={item.user} src={item.avatar} size="xs" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{item.user}</span>
                {item.repo && (
                  <ForgeBadge variant="default" size="sm" mono>
                    {item.repo}
                  </ForgeBadge>
                )}
              </div>
              <p className="text-xs text-[var(--df-muted-foreground)] truncate mt-0.5">
                {item.title}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <span className="text-[11px] font-mono text-[var(--df-muted-foreground)] shrink-0">
            {item.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
};

export { ForgeTimeline };
