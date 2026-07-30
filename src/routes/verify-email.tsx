import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { AuthLayout } from '@/layouts/auth-layout';
import { AuthService } from '@/services/auth.service';
import { ForgeButton } from '@/components/forge/ForgeButton';

const verifyEmailSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute('/verify-email')({
  validateSearch: (search: Record<string, unknown>) => verifyEmailSearchSchema.parse(search),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const search = Route.useSearch();
  const token = search.token || 'demo_verify_token_123';

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    async function verify() {
      try {
        const res = await AuthService.verifyEmail({ token });
        if (mounted) {
          setStatus('success');
          setMessage(res.message);
        }
      } catch (err: any) {
        if (mounted) {
          setStatus('error');
          setMessage(err.message || 'Invalid or expired verification link.');
        }
      }
    }

    verify();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <AuthLayout
      title="Email Verification"
      subtitle="Verifying your work email address with DevForge enterprise identity service."
    >
      <div className="flex flex-col items-center justify-center text-center rounded-3xl border border-[var(--df-border)] bg-[var(--df-card)] p-8 shadow-xl">
        {status === 'verifying' && (
          <div className="flex flex-col items-center gap-4 py-6">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--df-primary-light)]" />
            <h3 className="text-base font-semibold text-white">Verifying email address...</h3>
            <p className="text-xs text-[var(--df-muted-foreground)]">
              Please wait while we confirm your identity token.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4 py-4 animate-fadeIn">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Email Verified!</h3>
            <p className="text-xs text-[var(--df-muted-foreground)] max-w-sm leading-relaxed">
              {message || 'Your email address has been successfully verified.'}
            </p>

            <Link to="/onboarding/create-workspace" className="mt-4 w-full">
              <ForgeButton
                variant="primary"
                size="lg"
                className="w-full font-semibold"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Proceed to Workspace Creation
              </ForgeButton>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 py-4 animate-fadeIn">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Verification Failed</h3>
            <p className="text-xs text-[var(--df-danger)] max-w-sm">{message}</p>
            <p className="text-xs text-[var(--df-muted-foreground)] max-w-sm">
              The verification link may have expired or already been used.
            </p>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <Link to="/login" className="w-full">
                <ForgeButton variant="secondary" size="md" className="w-full">
                  Return to Sign In
                </ForgeButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
