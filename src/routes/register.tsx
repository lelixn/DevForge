import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';

import { AuthLayout } from '@/layouts/auth-layout';
import { RequireGuest } from '@/shared/guards/require-guest';
import {
  AuthInput,
  PasswordInput,
  PasswordStrength,
  OAuthButton,
  AuthDivider,
} from '@/features/auth/components';
import { registerSchema, type RegisterSchemaType } from '@/features/auth/schemas/register.schema';
import { useAuth } from '@/hooks/use-auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const { register: signup, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterSchemaType) => {
    await signup({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      acceptTerms: data.acceptTerms,
    });
  };

  return (
    <RequireGuest>
      <AuthLayout
        title="Start building on DevForge"
        subtitle="Create your developer account to collaborate, manage sprints, and deploy AI-driven software."
      >
        <div className="flex flex-col gap-6">
          {/* OAuth Buttons */}
          <div className="flex items-center gap-3">
            <OAuthButton provider="github" isLoading={isLoading} />
            <OAuthButton provider="google" isLoading={isLoading} />
            <OAuthButton provider="microsoft" isLoading={isLoading} />
          </div>

          <AuthDivider label="or register with email" />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <AuthInput
              label="Full Name"
              placeholder="Alex Rivera"
              leftIcon={<UserIcon className="h-4 w-4" />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <AuthInput
              label="Work Email"
              type="email"
              placeholder="alex@company.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div>
              <PasswordInput
                label="Password"
                placeholder="••••••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              <PasswordStrength password={passwordValue} />
            </div>

            <PasswordInput
              label="Confirm Password"
              placeholder="••••••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            {/* Terms checkbox */}
            <div className="mt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-[var(--df-border)] bg-[var(--df-input)] text-[var(--df-primary)] focus:ring-[var(--df-primary)]"
                  {...register('acceptTerms')}
                />
                <span className="text-xs text-[var(--df-muted-foreground)] leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-white hover:underline">
                    Terms of Service
                  </a>{' '}
                  and Privacy Policy.
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-[11px] font-medium text-[var(--df-danger)]">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>

            <ForgeButton
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className="mt-2 w-full font-semibold shadow-lg shadow-[var(--df-primary)]/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Continue to Workspace Setup
            </ForgeButton>
          </form>

          {/* Login Link */}
          <p className="text-center text-xs text-[var(--df-muted-foreground)]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Sign in to your workspace
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--df-muted-foreground)]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>14-day Pro trial included. No credit card required.</span>
          </div>
        </div>
      </AuthLayout>
    </RequireGuest>
  );
}
