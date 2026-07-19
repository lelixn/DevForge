import * as React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  accent = false,
  className,
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5 transition-all duration-200 hover:border-[var(--df-border-strong)]',
        accent &&
          'border-[var(--df-primary)]/20 bg-gradient-to-br from-[var(--df-primary)]/5 to-[var(--df-card)]',
        className
      )}
    >
      {/* Background glow for accent cards */}
      {accent && (
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--df-primary)]/10 blur-2xl" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--df-muted-fg)]">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--df-fg)]">{value}</p>

          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  isPositive && 'text-[var(--df-success)]',
                  isNegative && 'text-[var(--df-danger)]',
                  isNeutral && 'text-[var(--df-muted-fg)]'
                )}
              >
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {isNeutral && <Minus className="h-3 w-3" />}
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-xs text-[var(--df-muted-fg)]">{changeLabel}</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]',
              accent &&
                'border-[var(--df-primary)]/20 bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
