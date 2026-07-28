import { cn } from '@/utils/cn';

export type ForgeAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ForgeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: ForgeAvatarSize;
  status?: 'online' | 'offline' | 'away' | 'busy';
  glow?: boolean;
  border?: boolean;
}

const ForgeAvatar = ({
  className,
  src,
  name,
  size = 'md',
  status,
  glow = false,
  border = true,
  ...props
}: ForgeAvatarProps) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'DF';

  const sizeStyles: Record<ForgeAvatarSize, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  const statusColors = {
    online: 'bg-[#34D399]',
    offline: 'bg-[#71717A]',
    away: 'bg-[#FBBF24]',
    busy: 'bg-[#F87171]',
  };

  return (
    <div className={cn('relative inline-flex shrink-0 select-none', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-[var(--df-gradient-primary)] font-semibold text-white transition-all overflow-hidden',
          border && 'ring-2 ring-[var(--df-border-strong)]',
          glow && 'shadow-[0_0_15px_rgba(124,58,237,0.4)]',
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
          <span className="font-mono">{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--df-background)] shadow-sm',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

export { ForgeAvatar };
