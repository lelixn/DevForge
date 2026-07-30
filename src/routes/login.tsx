import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';

import { AuthLayout } from '@/layouts/auth-layout';
import { RequireGuest } from '@/shared/guards/require-guest';
import { AuthInput, PasswordInput, OAuthButton, AuthDivider } from '@/features/auth/components';
import { loginSchema, type LoginSchemaType } from '@/features/auth/schemas/login.schema';
import { useAuth } from '@/hooks/use-auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => loginSearchSchema.parse(search),
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    await login(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      search.redirect
    );
  };

  return (
    <RequireGuest>
      <AuthLayout
        title="Welcome back to DevForge"
        subtitle="Sign in to your engineering workspace to access your projects, APIs, and AI workflows."
      >
        <div className="flex flex-col gap-6">
          {/* OAuth Sign In Options */}
          <div className="flex items-center gap-3">
            <OAuthButton provider="github" isLoading={isLoading} />
            <OAuthButton provider="google" isLoading={isLoading} />
            <OAuthButton provider="microsoft" isLoading={isLoading} />
          </div>

          <AuthDivider label="or continue with email" />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <AuthInput
              label="Work Email"
              type="email"
              placeholder="name@company.com"
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
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[var(--df-muted-foreground)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-[var(--df-border)] bg-[var(--df-input)] text-[var(--df-primary)] focus:ring-[var(--df-primary)]"
                    {...register('rememberMe')}
                  />
                  <span>Remember me for 30 days</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-[var(--df-primary-light)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <ForgeButton
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isLoading}
              className="mt-2 w-full font-semibold shadow-lg shadow-[var(--df-primary)]/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign In to Workspace
            </ForgeButton>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)]/60 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Instant Demo Mode</span>
            </div>
            <p className="text-[11px] text-[var(--df-muted-foreground)]">
              Any email address (e.g. john@devforge.io) and any password will log you into the demo
              environment instantly.
            </p>
          </div>

          {/* Register Link */}
          <p className="text-center text-xs text-[var(--df-muted-foreground)]">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-white hover:underline">
              Create a free workspace
            </Link>
          </p>
        </div>
      </AuthLayout>
    </RequireGuest>
  );
}
