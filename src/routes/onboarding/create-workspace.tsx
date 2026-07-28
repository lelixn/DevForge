import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Globe2, Users, Layers, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { OnboardingLayout } from '@/layouts/onboarding-layout';
import { RequireAuth } from '@/shared/guards/require-auth';
import { AuthInput } from '@/features/auth/components';
import {
  createWorkspaceSchema,
  type CreateWorkspaceSchemaType,
} from '@/features/workspace/schemas/workspace.schema';
import { WorkspaceService } from '@/services/workspace.service';
import { useAuthStore } from '@/stores/auth';
import { ForgeButton } from '@/components/forge/ForgeButton';

export const Route = createFileRoute('/onboarding/create-workspace')({
  component: CreateWorkspacePage,
});

function CreateWorkspacePage() {
  const navigate = useNavigate();
  const { setCurrentWorkspace, setWorkspaces, workspaces } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateWorkspaceSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      slug: '',
      logoUrl: '',
      timezone: defaultTimezone,
      size: '1-5',
      industry: 'software',
    },
  });

  const workspaceName = watch('name');

  // Auto slug generator
  useEffect(() => {
    if (workspaceName) {
      const generatedSlug = workspaceName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [workspaceName, setValue]);

  const onSubmit = async (data: CreateWorkspaceSchemaType) => {
    setIsSubmitting(true);
    try {
      const workspace = await WorkspaceService.createWorkspace(data);
      setCurrentWorkspace(workspace);
      setWorkspaces([...workspaces, workspace]);
      toast.success(`Workspace "${workspace.name}" created successfully!`);
      navigate({ to: '/onboarding/invite-members' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to create workspace.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireAuth>
      <OnboardingLayout
        step={1}
        title="Create your engineering workspace"
        subtitle="Workspaces isolate team members, projects, APIs, and sprint permissions for multi-tenant security."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
          {/* Workspace Name */}
          <AuthInput
            label="Workspace Name"
            placeholder="e.g. Acme Engineering"
            leftIcon={<Building2 className="h-4 w-4" />}
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Workspace Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-200">Workspace URL Slug</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-mono text-[var(--df-muted-foreground)]">
                devforge.io/
              </span>
              <input
                className="h-11 w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] pl-28 pr-4 text-xs font-mono text-white placeholder-[var(--df-muted-foreground)] focus:border-[var(--df-primary)] focus:outline-none"
                placeholder="acme-engineering"
                {...register('slug')}
              />
            </div>
            {errors.slug && (
              <span className="text-[11px] font-medium text-[var(--df-danger)]">
                {errors.slug.message}
              </span>
            )}
          </div>

          {/* Grid Layout for Timezone & Industry */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Timezone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5 text-[var(--df-primary-light)]" />
                Primary Timezone
              </label>
              <select
                className="h-11 w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3 text-xs text-white focus:border-[var(--df-primary)] focus:outline-none"
                {...register('timezone')}
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Berlin">Europe/Berlin (CET)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              </select>
            </div>

            {/* Industry */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[var(--df-primary-light)]" />
                Industry Focus
              </label>
              <select
                className="h-11 w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3 text-xs text-white focus:border-[var(--df-primary)] focus:outline-none"
                {...register('industry')}
              >
                <option value="software">Software & SaaS</option>
                <option value="fintech">Fintech & Banking</option>
                <option value="healthcare">Healthcare & Biotech</option>
                <option value="ecommerce">E-Commerce & Retail</option>
                <option value="education">EdTech & Research</option>
                <option value="media">Media & Entertainment</option>
                <option value="gaming">Gaming & Interactive</option>
                <option value="other">Other Industry</option>
              </select>
            </div>
          </div>

          {/* Team Size Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[var(--df-primary-light)]" />
              Engineering Team Size
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['1-5', '6-15', '16-50', '51-200', '200+'] as const).map((sizeOption) => (
                <label
                  key={sizeOption}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] p-2.5 text-xs font-medium text-white transition-all hover:border-[var(--df-primary)] has-[:checked]:border-[var(--df-primary)] has-[:checked]:bg-[var(--df-primary)]/10"
                >
                  <input
                    type="radio"
                    value={sizeOption}
                    className="sr-only"
                    {...register('size')}
                  />
                  <span>{sizeOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Logo Upload Placeholder */}
          <div className="rounded-2xl border border-dashed border-[var(--df-border)] bg-[var(--df-secondary)]/40 p-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--df-card)] text-[var(--df-muted-foreground)] border border-[var(--df-border)]">
                <Upload className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Upload Workspace Brand Logo</p>
                <p className="text-[10px] text-[var(--df-muted-foreground)]">
                  PNG, SVG, or JPG (max 2MB). Optional.
                </p>
              </div>
            </div>
          </div>

          <ForgeButton
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            className="mt-2 w-full font-semibold shadow-lg shadow-[var(--df-primary)]/25"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Create Workspace & Next
          </ForgeButton>
        </form>
      </OnboardingLayout>
    </RequireAuth>
  );
}
