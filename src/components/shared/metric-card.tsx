import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  progress?: number; // 0-100
  color?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const colorMap = {
  primary: 'bg-[var(--df-primary)]',
  success: 'bg-[var(--df-success)]',
  warning: 'bg-[var(--df-warning)]',
  danger: 'bg-[var(--df-danger)]',
};

const glowMap = {
  primary: 'shadow-[0_0_12px_rgba(124,58,237,0.4)]',
  success: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
  warning: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
  danger: 'shadow-[0_0_12px_rgba(239,68,68,0.4)]',
};

export function MetricCard({
  label,
  value,
  unit,
  progress,
  color = 'primary',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-4 transition-all duration-200 hover:border-[var(--df-border-strong)]',
        className
      )}
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--df-muted-fg)]">
        {label}
      </p>
      <div className="mb-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-[var(--df-fg)]">{value}</span>
        {unit && <span className="text-sm text-[var(--df-muted-fg)]">{unit}</span>}
      </div>
      {progress !== undefined && (
        <div className="space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--df-secondary)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={cn('h-full rounded-full', colorMap[color], glowMap[color])}
            />
          </div>
          <p className="text-xs text-[var(--df-muted-fg)]">{progress}% of target</p>
        </div>
      )}
    </div>
  );
}
