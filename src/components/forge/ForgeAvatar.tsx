import { cn } from '@/utils/cn';

type ForgeAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface ForgeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: ForgeAvatarSize;
  status?: 'online' | 'offline';
}

const ForgeAvatar = ({ className, src, name, size = 'md', status, ...props }: ForgeAvatarProps) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  const sizeStyles: Record<ForgeAvatarSize, string> = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  return (
    <div className={cn('relative inline-flex', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-[var(--df-gradient-primary)] font-semibold text-white shadow-sm transition-all',
          sizeStyles[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--df-card)]',
            status === 'online' ? 'bg-[var(--df-success)]' : 'bg-[var(--df-muted-foreground)]'
          )}
        />
      )}
    </div>
  );
};

export { ForgeAvatar };
