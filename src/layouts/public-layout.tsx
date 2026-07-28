import { TooltipProvider } from '@/components/ui/tooltip';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen w-full bg-[var(--df-background)] text-[var(--df-foreground)] selection:bg-[var(--df-primary)]/30 selection:text-white">
        <main className="w-full">{children}</main>
      </div>
    </TooltipProvider>
  );
}
