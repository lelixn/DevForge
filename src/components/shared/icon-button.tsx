import * as React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

interface IconButtonProps {
  icon: React.ReactNode;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'ghost' | 'subtle' | 'outline';
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, label, size = 'sm', variant = 'ghost', active = false, ...props }, ref) => {
    const sizes = {
      xs: 'h-6 w-6 [&_svg]:h-3.5 [&_svg]:w-3.5',
      sm: 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
      md: 'h-9 w-9 [&_svg]:h-4.5 [&_svg]:w-4.5',
    };
    const variants = {
      ghost:
        'bg-transparent hover:bg-[var(--df-secondary)] text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]',
      subtle:
        'bg-[var(--df-secondary)] hover:bg-[var(--df-subtle)] text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]',
      outline:
        'bg-transparent border border-[var(--df-border)] hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)] text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]',
    };

    const button = (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--df-primary)]',
          sizes[size],
          variants[variant],
          active && 'bg-[var(--df-primary)]/10 text-[var(--df-primary)]',
          props.disabled && 'cursor-not-allowed opacity-40',
          className
        )}
        onClick={props.onClick}
        disabled={props.disabled}
        title={props.title}
      >
        {icon}
      </motion.button>
    );

    if (label) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      );
    }

    return button;
  }
);
IconButton.displayName = 'IconButton';
