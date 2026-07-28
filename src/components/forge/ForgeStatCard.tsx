import type { ReactNode } from 'react';
import { ForgeCard } from './ForgeCard';
import { ForgeBadge } from './ForgeBadge';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  accent?: boolean;
  className?: string;
}

const ForgeStatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  accent = false,
  className,
}: ForgeStatCardProps) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <ForgeCard
      hoverable
      spotlight
      glow={accent}
      gradientBorder={accent}
      className={cn('flex flex-col justify-between p-6', className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--df-muted-foreground)] tracking-wide font-sans">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold font-mono text-white tracking-tight">{value}</h3>
        </div>
        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface-elevated)] text-[var(--df-muted-foreground)] transition-colors',
              accent &&
                'bg-[rgba(124,58,237,0.15)] border-[rgba(124,58,237,0.3)] text-[var(--df-primary-light)]'
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {(change !== undefined || changeLabel) && (
        <div className="mt-4 flex items-center gap-2">
          {change !== undefined && (
            <ForgeBadge variant={isPositive ? 'success' : 'danger'} size="sm" mono>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 inline" />
              ) : (
                <ArrowDownRight className="h-3 w-3 inline" />
              )}
              {Math.abs(change)}%
            </ForgeBadge>
          )}
          {changeLabel && (
            <span className="text-xs text-[var(--df-muted-foreground)]">{changeLabel}</span>
          )}
        </div>
      )}
    </ForgeCard>
  );
};

export { ForgeStatCard };
