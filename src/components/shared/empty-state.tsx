import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
}: EmptyStateProps) {
  const sizes = {
    sm: {
      wrapper: 'py-10',
      iconWrap: 'h-10 w-10',
      iconSize: 'h-5 w-5',
      title: 'text-sm',
      desc: 'text-xs',
    },
    md: {
      wrapper: 'py-16',
      iconWrap: 'h-14 w-14',
      iconSize: 'h-6 w-6',
      title: 'text-base',
      desc: 'text-sm',
    },
    lg: {
      wrapper: 'py-24',
      iconWrap: 'h-20 w-20',
      iconSize: 'h-8 w-8',
      title: 'text-lg',
      desc: 'text-base',
    },
  };
  const s = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col items-center justify-center text-center', s.wrapper, className)}
    >
      {icon && (
        <div
          className={cn(
            'mb-4 flex items-center justify-center rounded-2xl border border-[var(--df-border)] bg-[var(--df-secondary)] text-[var(--df-muted-fg)]',
            s.iconWrap,
            `[&_svg]:${s.iconSize}`
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn('font-semibold text-[var(--df-fg)]', s.title)}>{title}</h3>
      {description && (
        <p className={cn('mt-1.5 max-w-sm text-[var(--df-muted-fg)]', s.desc)}>{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
