import type { ReactNode } from 'react';
import { Layers } from 'lucide-react';
import { ForgeBadge } from './ForgeBadge';
import { cn } from '@/utils/cn';

export interface ForgeBlueprintProps {
  title?: string;
  revision?: string;
  status?: string;
  systemId?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

const ForgeBlueprint = ({
  title = 'TECHNICAL BLUEPRINT VIEW',
  revision = 'v4.2.0',
  status = 'NOMINAL',
  systemId = 'SYS_ARCH_01',
  children,
  className,
  headerActions,
}: ForgeBlueprintProps) => {
  return (
    <div
      className={cn(
        'relative rounded-[24px] border border-[rgba(6,182,212,0.25)] bg-[#07070A] bg-blueprint-grid p-6 shadow-[0_0_50px_rgba(6,182,212,0.06)] overflow-hidden',
        className
      )}
    >
      {/* Corner Precision Reticles */}
      <div className="pointer-events-none absolute top-3 left-3 text-xs font-mono text-[var(--df-accent)] opacity-70">
        ┌ [SYS_ID: {systemId}]
      </div>
      <div className="pointer-events-none absolute top-3 right-3 text-xs font-mono text-[var(--df-accent)] opacity-70">
        [REV: {revision}] ┐
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 text-xs font-mono text-[var(--df-accent)] opacity-70">
        └ [BLUEPRINT MODE]
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 text-xs font-mono text-[var(--df-accent)] opacity-70">
        [DEVFORGE ENGINE] ┘
      </div>

      {/* Blueprint Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[rgba(6,182,212,0.2)] mt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(6,182,212,0.15)] border border-[rgba(6,182,212,0.3)] text-[var(--df-accent)] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-mono tracking-tight text-white uppercase">
                {title}
              </h2>
              <ForgeBadge variant="cyan" size="sm" dot pulse mono>
                {status}
              </ForgeBadge>
            </div>
            <p className="text-xs font-mono text-[var(--df-muted-foreground)]">
              PROPRIETARY TECHNICAL SPECIFICATION // FORGE BLUEPRINT ENGINE
            </p>
          </div>
        </div>

        {headerActions && <div className="flex items-center gap-2 z-10">{headerActions}</div>}
      </div>

      {/* Main Blueprint Workspace Canvas */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export { ForgeBlueprint };
