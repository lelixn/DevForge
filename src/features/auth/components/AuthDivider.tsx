interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = 'or continue with email' }: AuthDividerProps) {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--df-border)]" />
      </div>
      <div className="relative bg-[var(--df-card)] px-3 text-[11px] font-medium uppercase tracking-wider text-[var(--df-muted-foreground)]">
        {label}
      </div>
    </div>
  );
}
