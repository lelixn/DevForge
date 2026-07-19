import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  Shield,
  Palette,
  Bell,
  CreditCard,
  Key,
  Moon,
  Sun,
  Monitor,
  Check,
  Trash2,
  Plus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GlassCard } from '@/components/shared/glass-card';
import { GradientButton } from '@/components/shared/gradient-button';
import { Badge } from '@/components/shared/badge';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/settings/')({ component: SettingsPage });

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
  { id: 'workspace', label: 'Workspace', icon: <Building2 className="h-4 w-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette className="h-4 w-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'api-keys', label: 'API Keys', icon: <Key className="h-4 w-4" /> },
];

const API_KEYS = [
  {
    name: 'Production v2',
    key: 'df_live_••••••••••••••••3f2a',
    created: 'Jul 15, 2026',
    lastUsed: '2m ago',
    scopes: ['read', 'write'],
  },
  {
    name: 'CI Pipeline',
    key: 'df_live_••••••••••••••••8c1b',
    created: 'Jun 20, 2026',
    lastUsed: '1h ago',
    scopes: ['read'],
  },
  {
    name: 'Dev Testing',
    key: 'df_test_••••••••••••••••4e9d',
    created: 'May 5, 2026',
    lastUsed: '3 days ago',
    scopes: ['read', 'write', 'admin'],
  },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'bg-[var(--df-primary)]' : 'bg-[var(--df-secondary)]'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );
}

function InputField({
  label,
  value,
  type = 'text',
  placeholder,
}: {
  label: string;
  value?: string;
  type?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[var(--df-muted-fg)]">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          defaultValue={value}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3.5 py-2.5 text-sm text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:border-[var(--df-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20 transition-all"
        />
        {type === 'password' && (
          <button
            onClick={() => setShow((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-xl font-bold text-white">
            JD
          </div>
          <button className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--df-border)] bg-[var(--df-card)] text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors">
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--df-fg)]">John Doe</p>
          <p className="text-xs text-[var(--df-muted-fg)]">john@devforge.io</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="Full Name" value="John Doe" />
        <InputField label="Username" value="johndoe" />
        <InputField label="Email" value="john@devforge.io" type="email" />
        <InputField label="Role" value="Product Manager" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--df-muted-fg)]">Bio</label>
        <textarea
          defaultValue="Engineering leader at DevForge. Building the future of developer tooling."
          className="w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3.5 py-2.5 text-sm text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:border-[var(--df-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20 resize-none"
          rows={3}
        />
      </div>
      <GradientButton size="sm">Save Profile</GradientButton>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">Change Password</h3>
        <div className="flex flex-col gap-4">
          <InputField
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <InputField label="New Password" type="password" placeholder="Min. 8 characters" />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter new password"
          />
          <GradientButton size="sm">Update Password</GradientButton>
        </div>
      </div>
      <div className="border-t border-[var(--df-border)] pt-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[var(--df-fg)]">Authenticator App</p>
            <p className="text-xs text-[var(--df-muted-fg)]">
              Use an authenticator app for extra security
            </p>
          </div>
          <Badge variant="danger" size="xs">
            Not Enabled
          </Badge>
        </div>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('#7C3AED');
  const ACCENTS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-3 text-xs font-medium text-[var(--df-muted-fg)]">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', icon: <Sun className="h-5 w-5" />, label: 'Light' },
            { id: 'dark', icon: <Moon className="h-5 w-5" />, label: 'Dark' },
            { id: 'system', icon: <Monitor className="h-5 w-5" />, label: 'System' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                theme === t.id
                  ? 'border-[var(--df-primary)] bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
                  : 'border-[var(--df-border)] text-[var(--df-muted-fg)] hover:border-[var(--df-border-strong)]'
              )}
            >
              {t.icon}
              <span className="text-xs font-medium">{t.label}</span>
              {theme === t.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-[var(--df-muted-fg)]">Accent Color</p>
        <div className="flex gap-2">
          {ACCENTS.map((c) => (
            <button
              key={c}
              onClick={() => setAccent(c)}
              className="relative h-8 w-8 rounded-full border-2 transition-all"
              style={{
                backgroundColor: c,
                borderColor: accent === c ? c : 'transparent',
                outline: accent === c ? `2px solid ${c}40` : 'none',
                outlineOffset: 2,
              }}
            >
              {accent === c && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    deployments: true,
    sprints: true,
    mentions: true,
    billing: false,
  });
  const toggle = (k: keyof typeof settings) => setSettings((p) => ({ ...p, [k]: !p[k] }));
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(settings).map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium capitalize text-[var(--df-fg)]">{k}</p>
            <p className="text-xs text-[var(--df-muted-fg)]">Receive {k} notifications</p>
          </div>
          <Toggle checked={v} onChange={() => toggle(k as keyof typeof settings)} />
        </div>
      ))}
    </div>
  );
}

function BillingSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-2xl border border-[var(--df-primary)]/20 bg-gradient-to-br from-[var(--df-primary)]/10 to-[var(--df-card)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--df-fg)]">Pro Plan</p>
            <p className="text-xs text-[var(--df-muted-fg)]">$29/month · Billed annually</p>
          </div>
          <Badge variant="primary" size="xs">
            Active
          </Badge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          {[
            { label: 'Projects', val: '14 / ∞' },
            { label: 'Members', val: '38 / 50' },
            { label: 'AI Credits', val: '1.2k / 5k' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)]/50 px-3 py-2"
            >
              <p className="font-semibold text-[var(--df-fg)]">{s.val}</p>
              <p className="text-[var(--df-muted-fg)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 px-4 py-3">
        <p className="text-xs font-semibold text-[var(--df-muted-fg)] uppercase tracking-wider mb-2">
          Payment Method
        </p>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-12 items-center justify-center rounded-lg bg-[var(--df-secondary)] font-mono text-[10px] font-bold text-[var(--df-fg)]">
            VISA
          </div>
          <span className="text-sm text-[var(--df-fg)]">•••• •••• •••• 4242</span>
          <span className="text-xs text-[var(--df-muted-fg)]">Exp 12/27</span>
        </div>
      </div>
    </div>
  );
}

function APIKeysSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--df-muted-fg)]">{API_KEYS.length} active keys</p>
        <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
          New API Key
        </GradientButton>
      </div>
      {API_KEYS.map((apiKey, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--df-fg)]">{apiKey.name}</p>
            <button className="text-[var(--df-danger)] hover:opacity-80 transition-opacity">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <code className="mb-3 block rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-2 font-mono text-xs text-[var(--df-muted-fg)]">
            {apiKey.key}
          </code>
          <div className="flex items-center justify-between text-[10px] text-[var(--df-muted-fg)]">
            <span>Created {apiKey.created}</span>
            <span>Last used {apiKey.lastUsed}</span>
            <div className="flex gap-1">
              {apiKey.scopes.map((s) => (
                <Badge key={s} size="xs">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SECTION_CONTENT: Record<string, React.ReactNode> = {
  profile: <ProfileSection />,
  security: <SecuritySection />,
  appearance: <AppearanceSection />,
  notifications: <NotificationsSection />,
  billing: <BillingSection />,
  'api-keys': <APIKeysSection />,
  workspace: (
    <div className="flex flex-col gap-4">
      <InputField label="Workspace Name" value="Engineering" />
      <InputField label="Workspace Slug" value="engineering" />
      <InputField label="Workspace URL" value="https://devforge.io/w/engineering" />
      <GradientButton size="sm">Save Workspace</GradientButton>
    </div>
  ),
};

function SettingsPage() {
  const [active, setActive] = useState('profile');
  const section = SECTIONS.find((s) => s.id === active);

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Manage your account, workspace, and preferences" />
      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="flex flex-col gap-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all text-left',
                  active === s.id
                    ? 'bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
                    : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
                )}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard>
              <div className="mb-5 border-b border-[var(--df-border)] pb-4">
                <h2 className="text-base font-semibold text-[var(--df-fg)]">{section?.label}</h2>
              </div>
              {SECTION_CONTENT[active]}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
