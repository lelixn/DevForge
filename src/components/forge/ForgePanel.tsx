import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ForgePanelProps {
  title?: string;
  tagline?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  blueprint?: boolean;
}

const ForgePanel = ({
  title,
  tagline,
  headerAction,
  children,
  className,
  blueprint = false,
}: ForgePanelProps) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-[var(--df-border)] bg-[var(--df-surface)] p-6 shadow-sm overflow-hidden',
        blueprint && 'bg-blueprint-grid border-[rgba(6,182,212,0.25)]',
        className
      )}
    >
      {/* Reticle Corner Brackets for Industrial Blueprint look */}
      {blueprint && (
        <>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--df-accent)] opacity-60">
            ┌
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-[var(--df-accent)] opacity-60">
            ┐
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--df-accent)] opacity-60">
            └
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--df-accent)] opacity-60">
            ┘
          </div>
        </>
      )}

      {(title || headerAction) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--df-border)]">
          <div>
            {title && <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>}
            {tagline && (
              <p className="text-xs font-mono text-[var(--df-muted-foreground)]">{tagline}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export { ForgePanel };
