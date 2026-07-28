import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeMetricProps {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: ReactNode;
  status?: 'nominal' | 'warning' | 'critical';
  className?: string;
}

const ForgeMetric = ({
  label,
  value,
  change,
  unit,
  icon,
  status = 'nominal',
  className,
}: ForgeMetricProps) => {
  const statusGlows = {
    nominal: 'border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.02)]',
    warning: 'border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.02)]',
    critical: 'border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.02)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative rounded-2xl border border-[var(--df-border)] bg-[var(--df-surface)] p-5 transition-all hover:border-[var(--df-border-strong)]',
        statusGlows[status],
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[var(--df-muted-foreground)] tracking-wide uppercase font-sans">
          {label}
        </span>
        {icon && <div className="text-[var(--df-accent)]">{icon}</div>}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold font-mono text-white tracking-tight">{value}</span>
          {unit && (
            <span className="text-xs font-mono text-[var(--df-muted-foreground)]">{unit}</span>
          )}
        </div>

        {change !== undefined && (
          <div
            className={cn(
              'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-mono font-medium',
              change > 0
                ? 'bg-[rgba(16,185,129,0.15)] text-[#34D399]'
                : change < 0
                  ? 'bg-[rgba(239,68,68,0.15)] text-[#F87171]'
                  : 'bg-[rgba(255,255,255,0.08)] text-[var(--df-muted-foreground)]'
            )}
          >
            {change > 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : change < 0 ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { ForgeMetric };
