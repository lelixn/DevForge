import { cn } from '@/utils/cn';

interface IconBoxProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ghost';
  className?: string;
}

const sizeClasses = {
  sm: 'icon-box-sm',
  md: 'icon-box-md',
  lg: 'icon-box-lg',
};

const variantClasses = {
  default: 'border-[var(--df-border)] bg-[var(--df-secondary)] text-[var(--df-muted-foreground)]',
  primary: 'border-[var(--df-primary)]/20 bg-[var(--df-primary)]/10 text-[var(--df-primary)]',
  ghost: 'border-transparent bg-transparent text-[var(--df-muted-foreground)]',
};

export function IconBox({ children, size = 'md', variant = 'default', className }: IconBoxProps) {
  return (
    <span className={cn('icon-box', sizeClasses[size], variantClasses[variant], className)}>
      {children}
    </span>
  );
}
