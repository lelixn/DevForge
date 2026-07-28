import { createFileRoute, Link, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import { AuthLayout } from '@/layouts/auth-layout';
import { RequireGuest } from '@/shared/guards/require-guest';
import { PasswordInput, PasswordStrength } from '@/features/auth/components';
import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from '@/features/auth/schemas/reset-password.schema';
import { useAuth } from '@/hooks/use-auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const search = useSearch({ strict: false }) as { token?: string };
  const token = search.token || 'demo_reset_token_123';
  const { resetPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPassword({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <RequireGuest>
      <AuthLayout
        title="Set new password"
        subtitle="Your new password must be at least 8 characters long and include numbers and special characters."
      >
        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <div>
              <PasswordInput
                label="New Password"
                placeholder="••••••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              <PasswordStrength password={passwordValue} />
            </div>

            <PasswordInput
              label="Confirm New Password"
              placeholder="••••••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <ForgeButton
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className="mt-2 w-full font-semibold shadow-lg shadow-[var(--df-primary)]/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Update Password & Sign In
            </ForgeButton>
          </form>

          <p className="text-center text-xs text-[var(--df-muted-foreground)]">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Sign in
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--df-muted-foreground)]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>All active sessions will be invalidated after password reset.</span>
          </div>
        </div>
      </AuthLayout>
    </RequireGuest>
  );
}
