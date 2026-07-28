import type { ReactNode } from 'react';
import { ForgeCard } from './ForgeCard';
import { ForgeBadge } from './ForgeBadge';
import { cn } from '@/utils/cn';

export interface ForgeChartCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  statusBadge?: string;
  children: ReactNode;
  className?: string;
  blueprint?: boolean;
}

const ForgeChartCard = ({
  title,
  subtitle,
  action,
  statusBadge,
  children,
  className,
  blueprint = false,
}: ForgeChartCardProps) => {
  return (
    <ForgeCard blueprint={blueprint} spotlight className={cn('p-6', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
            {statusBadge && (
              <ForgeBadge variant="cyan" size="sm" dot mono>
                {statusBadge}
              </ForgeBadge>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--df-muted-foreground)] font-mono">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>

      <div className="w-full">{children}</div>
    </ForgeCard>
  );
};

export { ForgeChartCard };
