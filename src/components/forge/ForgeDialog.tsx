import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  blueprint?: boolean;
}

const ForgeDialog = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  blueprint = false,
}: ForgeDialogProps) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative w-full rounded-[24px] border border-[var(--df-border-strong)] bg-[#101014] p-6 shadow-[var(--df-shadow-elevated)] z-10 overflow-hidden',
              blueprint && 'bg-blueprint-grid border-[rgba(6,182,212,0.3)]',
              maxWidthClasses[maxWidth]
            )}
          >
            {/* Top Bar Accent */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--df-border)]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(124,58,237,0.15)] text-[var(--df-primary-light)]">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  {title && (
                    <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
                  )}
                  {subtitle && (
                    <p className="text-xs font-mono text-[var(--df-muted-foreground)]">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ForgeModal = ForgeDialog;
export { ForgeDialog };
