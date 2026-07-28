import type { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils/cn';

export interface ForgeTooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const ForgeTooltip = ({ content, children, side = 'top', align = 'center' }: ForgeTooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            className={cn(
              'z-50 overflow-hidden rounded-lg border border-[var(--df-border-strong)] bg-[#15151C] px-3 py-1.5 text-xs text-white shadow-xl animate-in fade-in-0 zoom-in-95 font-sans'
            )}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[#15151C]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export { ForgeTooltip };
