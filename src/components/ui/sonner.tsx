import { useTheme } from '@/components/theme-provider';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl border',
          description: 'group-[.toast]:text-muted-foreground text-xs',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium rounded-lg text-xs px-3 py-1.5',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium rounded-lg text-xs px-3 py-1.5',
        },
      }}
      {...props}
    />
  );
}
