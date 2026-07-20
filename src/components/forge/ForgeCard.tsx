import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ForgeCardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
  glow?: boolean;
  gradientBorder?: boolean;
}

const ForgeCard = forwardRef<HTMLDivElement, ForgeCardProps>(
  ({ className, hoverable = false, glow = false, gradientBorder = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={hoverable ? { y: -4, boxShadow: 'var(--df-shadow-lg)' } : {}}
        className={cn(
          'rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] p-5 shadow-sm transition-all',
          glow && 'shadow-[var(--df-shadow-glow)]',
          gradientBorder && 'relative',
          className,
        )}
        {...props}
      >
        {gradientBorder && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--df-gradient-primary)] opacity-20"
            style={{
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}
        {props.children as React.ReactNode}
      </motion.div>
    );
  },
);

ForgeCard.displayName = 'ForgeCard';

export { ForgeCard };
