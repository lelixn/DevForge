import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

import { AuthLayout } from '@/layouts/auth-layout';
import { RequireGuest } from '@/shared/guards/require-guest';
import { AuthInput } from '@/features/auth/components';
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from '@/features/auth/schemas/forgot-password.schema';
import { useAuth } from '@/hooks/use-auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const { forgotPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    await forgotPassword(data);
    setSubmittedEmail(data.email);
  };

  return (
    <RequireGuest>
      <AuthLayout
        title={submittedEmail ? 'Check your email' : 'Reset your password'}
        subtitle={
          submittedEmail
            ? `We sent a password reset link to ${submittedEmail}`
            : "Enter your registered work email address and we'll send you instructions to reset your password."
        }
      >
        {submittedEmail ? (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Reset link sent!</h3>
              <p className="text-xs text-[var(--df-muted-foreground)] leading-relaxed max-w-sm">
                If an account exists for{' '}
                <span className="font-semibold text-white">{submittedEmail}</span>, you will receive
                an email with instructions within a few minutes.
              </p>

              <div className="mt-6 flex flex-col gap-3 w-full">
                <Link to="/reset-password">
                  <ForgeButton variant="outline" size="md" className="w-full text-xs">
                    Simulate Clicking Reset Link (Demo Mode)
                  </ForgeButton>
                </Link>
                <ForgeButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setSubmittedEmail(null)}
                  leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                  className="text-xs text-[var(--df-muted-foreground)] hover:text-white"
                >
                  Try another email address
                </ForgeButton>
              </div>
            </div>

            <p className="text-center text-xs text-[var(--df-muted-foreground)]">
              Back to{' '}
              <Link to="/login" className="font-semibold text-white hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <AuthInput
                label="Work Email Address"
                type="email"
                placeholder="name@company.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <ForgeButton
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isLoading}
                className="mt-2 w-full font-semibold shadow-lg shadow-[var(--df-primary)]/25"
              >
                Send Reset Instructions
              </ForgeButton>
            </form>

            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="flex items-center gap-2 text-xs font-semibold text-[var(--df-muted-foreground)] hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </AuthLayout>
    </RequireGuest>
  );
}
