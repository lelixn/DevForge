import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Plus, Trash2, Mail, Shield, ArrowRight, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

import { OnboardingLayout } from '@/layouts/onboarding-layout';
import { RequireAuth } from '@/shared/guards/require-auth';
import { useAuthStore } from '@/stores/auth';
import { WorkspaceService } from '@/services/workspace.service';
import { ForgeButton } from '@/components/forge/ForgeButton';
import type { UserRole } from '@/shared/types/auth.types';

export const Route = createFileRoute('/onboarding/invite-members')({
  component: InviteMembersPage,
});

interface InviteRow {
  id: string;
  email: string;
  role: UserRole;
}

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  owner: 'Full control, billing, workspace deletion, and member management.',
  admin: 'Manage projects, sprints, API workspaces, and invite team members.',
  developer: 'Create & update tasks, run AI workflows, manage code integrations.',
  viewer: 'Read-only access to sprint boards, documentation, and metrics.',
  guest: 'Limited view access to specific tagged projects.',
};

function InviteMembersPage() {
  const navigate = useNavigate();
  const { currentWorkspace } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [invites, setInvites] = useState<InviteRow[]>([
    { id: '1', email: '', role: 'developer' },
    { id: '2', email: '', role: 'developer' },
    { id: '3', email: '', role: 'admin' },
  ]);

  const addRow = () => {
    setInvites((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 9), email: '', role: 'developer' },
    ]);
  };

  const removeRow = (id: string) => {
    if (invites.length <= 1) return;
    setInvites((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: 'email' | 'role', value: string) => {
    setInvites((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSendInvites = async () => {
    const validInvites = invites.filter((r) => r.email.trim() !== '');

    if (validInvites.length === 0) {
      toast.info('No email addresses entered. Skipping to dashboard...');
      navigate({ to: '/' });
      return;
    }

    setIsSubmitting(true);
    try {
      await WorkspaceService.inviteMembers({
        workspaceId: currentWorkspace?.id || 'ws_default',
        invites: validInvites.map((i) => ({ email: i.email.trim(), role: i.role })),
      });
      toast.success(`Successfully sent ${validInvites.length} team invitations!`);
      navigate({ to: '/' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to send invitations.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireAuth requireWorkspace>
      <OnboardingLayout
        step={2}
        title={`Invite team to ${currentWorkspace?.name || 'Workspace'}`}
        subtitle="Add developers, tech leads, and product managers to start collaborating immediately."
      >
        <div className="flex flex-col gap-6">
          {/* Invite Rows List */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserPlus className="h-4 w-4 text-[var(--df-primary-light)]" />
                Team Member Emails & RBAC Roles
              </span>
              <span className="text-[11px] text-[var(--df-muted-foreground)]">
                {invites.filter((i) => i.email).length} invitations ready
              </span>
            </label>

            {invites.map((row, index) => (
              <div key={row.id} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--df-muted-foreground)]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    placeholder={`colleague${index + 1}@company.com`}
                    value={row.email}
                    onChange={(e) => updateRow(row.id, 'email', e.target.value)}
                    className="h-11 w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] pl-10 pr-3 text-xs text-white placeholder-[var(--df-muted-foreground)] focus:border-[var(--df-primary)] focus:outline-none"
                  />
                </div>

                {/* Role select */}
                <select
                  value={row.role}
                  onChange={(e) => updateRow(row.id, 'role', e.target.value as UserRole)}
                  className="h-11 w-36 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-3 text-xs font-medium text-white focus:border-[var(--df-primary)] focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                  <option value="viewer">Viewer</option>
                  <option value="owner">Owner</option>
                </select>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={invites.length <= 1}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--df-border)] text-[var(--df-muted-foreground)] hover:border-[var(--df-danger)] hover:bg-[var(--df-danger)]/10 hover:text-[var(--df-danger)] disabled:opacity-40 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <button
            type="button"
            onClick={addRow}
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--df-border)] p-3 text-xs font-semibold text-[var(--df-primary-light)] hover:border-[var(--df-primary)] hover:bg-[var(--df-primary)]/5 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add another team member</span>
          </button>

          {/* Role Legend Card */}
          <div className="rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)]/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
              <Shield className="h-4 w-4 text-[var(--df-primary-light)]" />
              <span>Role Permissions Summary</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-[11px] text-[var(--df-muted-foreground)] sm:grid-cols-2">
              <div>
                <span className="font-semibold text-white">Admin:</span> {ROLE_DESCRIPTIONS.admin}
              </div>
              <div>
                <span className="font-semibold text-white">Developer:</span>{' '}
                {ROLE_DESCRIPTIONS.developer}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-2 flex items-center justify-between gap-4">
            <ForgeButton
              type="button"
              variant="ghost"
              size="md"
              onClick={() => navigate({ to: '/' })}
              className="text-xs text-[var(--df-muted-foreground)] hover:text-white"
            >
              Skip for now
            </ForgeButton>

            <ForgeButton
              type="button"
              variant="primary"
              size="lg"
              onClick={handleSendInvites}
              isLoading={isSubmitting}
              className="font-semibold shadow-lg shadow-[var(--df-primary)]/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Send Invitations & Open Workspace
            </ForgeButton>
          </div>
        </div>
      </OnboardingLayout>
    </RequireAuth>
  );
}
