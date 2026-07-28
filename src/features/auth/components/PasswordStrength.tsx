import { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const analysis = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (password.length >= 12) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-500' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-orange-500' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-amber-500' };
      case 4:
      case 5:
        return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
      default:
        return { score: 0, label: '', color: '' };
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-[var(--df-subtle)]">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 transition-all duration-300 ${
              step <= analysis.score ? analysis.color : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-[var(--df-muted-foreground)]">Password strength</span>
        <span className="font-semibold text-white">{analysis.label}</span>
      </div>
    </div>
  );
}
