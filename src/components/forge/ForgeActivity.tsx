import { ForgeTimeline, type TimelineItem } from './ForgeTimeline';
import { ForgeCard } from './ForgeCard';
import { Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeActivityProps {
  title?: string;
  items: TimelineItem[];
  className?: string;
}

const ForgeActivity = ({ title = 'Recent Activity', items, className }: ForgeActivityProps) => {
  return (
    <ForgeCard spotlight className={cn('p-6', className)}>
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[var(--df-border)]">
        <Activity className="h-4 w-4 text-[var(--df-accent)]" />
        <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
      </div>
      <ForgeTimeline items={items} />
    </ForgeCard>
  );
};

export { ForgeActivity };
