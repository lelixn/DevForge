import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { AuthInput, type AuthInputProps } from './AuthInput';

export interface PasswordInputProps extends Omit<AuthInputProps, 'type' | 'rightIcon'> {
  showLockIcon?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showLockIcon = true, leftIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <AuthInput
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        leftIcon={leftIcon || (showLockIcon ? <Lock className="h-4 w-4" /> : undefined)}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex items-center justify-center text-[var(--df-muted-foreground)] hover:text-white transition-colors p-1 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
