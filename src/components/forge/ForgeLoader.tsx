import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeLoaderProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const DEFAULT_LOGS = [
  'INITIALIZING FORGE ENGINE...',
  'AUTHENTICATING DEVFORGE CORE...',
  'LOADING WORKSPACE MODULES...',
  'CONNECTING INTEGRATED SERVICES...',
  'SYSTEM READY.',
];

const ForgeLoader = ({ message, fullScreen = false, className }: ForgeLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < DEFAULT_LOGS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const content = (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {/* Hex/Terminal Glowing Graphic */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.3)] shadow-[0_0_30px_rgba(124,58,237,0.3)] mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl border border-dashed border-[var(--df-accent)] opacity-40"
        />
        <Terminal className="h-7 w-7 text-[var(--df-accent)]" />
      </div>

      {/* Terminal Text Log */}
      <div className="space-y-1.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--df-primary-light)] font-semibold tracking-wider">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--df-accent)] animate-ping" />
          <span>{message || DEFAULT_LOGS[currentStep]}</span>
        </div>

        <div className="w-64 h-1.5 bg-[var(--df-surface-elevated)] rounded-full overflow-hidden border border-[var(--df-border)] mt-4 mx-auto">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / DEFAULT_LOGS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-[var(--df-gradient-accent)]"
          />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070A] bg-blueprint-grid">
        {content}
      </div>
    );
  }

  return content;
};

export { ForgeLoader };
