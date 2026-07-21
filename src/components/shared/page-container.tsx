import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function PageContainer({ children, className, animate = true }: PageContainerProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn('layout-container flex flex-col gap-6 py-8', className)}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <div className={cn('layout-container flex flex-col gap-6 py-8', className)}>{children}</div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, badge, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--df-fg)]">{title}</h1>
          {badge}
        </div>
        {description && <p className="text-sm text-[var(--df-muted-fg)]">{description}</p>}
      </div>
      {children && <div className="flex flex-shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function Section({ title, description, children, action, className }: SectionProps) {
  return (
    <section className={cn('flex flex-col gap-3', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h2 className="text-sm font-semibold text-[var(--df-fg)]">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-xs text-[var(--df-muted-fg)]">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
