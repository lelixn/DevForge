import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  elevated?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = false, glow = false, elevated = false, ...props }, ref) => {
    const base = (
      <div
        ref={ref}
        className={cn(
          'glass rounded-2xl p-5 transition-all duration-200',
          hover && 'hover:border-[var(--df-border-strong)] hover:bg-[rgba(17,17,19,0.85)]',
          glow && 'glow-primary',
          elevated && 'shadow-[var(--shadow-elevated)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (hover) {
      return (
        <motion.div
          whileHover={{ y: -2, scale: 1.005 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {base}
        </motion.div>
      );
    }

    return base;
  }
);
GlassCard.displayName = 'GlassCard';
