import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  GitBranch,
  BookOpen,
  Code2,
  Rocket,
  Activity,
  Users,
  Settings,
  ArrowLeft,
  Star,
  GitCommit,
  AlertCircle,
  Clock,
  Plus,
  Play,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { Badge } from '@/components/shared/badge';
import { GlassCard } from '@/components/shared/glass-card';
import { PROJECTS, TASKS } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/projects/$id')({ component: ProjectWorkspacePage });

const TABS = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="h-4 w-4" /> },
  { id: 'repository', label: 'Repository', icon: <GitBranch className="h-4 w-4" /> },
  { id: 'docs', label: 'Documentation', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'api', label: 'API', icon: <Code2 className="h-4 w-4" /> },
  { id: 'deployments', label: 'Deployments', icon: <Rocket className="h-4 w-4" /> },
  { id: 'activity', label: 'Activity', icon: <Activity className="h-4 w-4" /> },
  { id: 'members', label: 'Members', icon: <Users className="h-4 w-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
];

const DEPLOYMENTS = [
  {
    env: 'Production',
    version: 'v1.2.4',
    status: 'success',
    time: '2m ago',
    commit: 'feat: collab layer',
    by: 'SK',
  },
  {
    env: 'Staging',
    version: 'v1.2.5-rc',
    status: 'running',
    time: '5m ago',
    commit: 'fix: auth redirect',
    by: 'AM',
  },
  {
    env: 'Preview',
    version: 'v1.2.5-prev',
    status: 'success',
    time: '12m ago',
    commit: 'style: sidebar tokens',
    by: 'SK',
  },
];

const COMMITS = [
  { hash: 'a1b2c3d', msg: 'feat: real-time collaboration layer', author: 'SK', time: '4m ago' },
  { hash: 'e4f5a6b', msg: 'fix: race condition in sprint resolver', time: '28m ago', author: 'AM' },
  { hash: 'c7d8e9f', msg: 'style: apply design tokens to sidebar', time: '1h ago', author: 'SK' },
  { hash: 'f0a1b2c', msg: 'test: add e2e coverage for login flow', time: '2h ago', author: 'CR' },
];

function OverviewTab({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <GlassCard>
          <h3 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Sprint Progress</h3>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-[var(--df-muted-fg)]">Sprint #12 — Active</span>
            <span className="text-xs font-semibold text-[var(--df-fg)]">{project.progress}%</span>
          </div>
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[var(--df-secondary)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full"
              style={{ backgroundColor: project.color }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Tasks', val: '24' },
              { label: 'Completed', val: '16' },
              { label: 'Remaining', val: '8' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/50 p-3 text-center"
              >
                <p className="text-xl font-bold text-[var(--df-fg)]">{s.val}</p>
                <p className="text-[10px] text-[var(--df-muted-fg)]">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Recent Commits</h3>
          <div className="flex flex-col gap-2">
            {COMMITS.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)]/40 px-3 py-2.5"
              >
                <GitCommit className="h-4 w-4 flex-shrink-0 text-[var(--df-muted-fg)]" />
                <span className="font-mono text-[10px] text-[var(--df-primary)] flex-shrink-0">
                  {c.hash}
                </span>
                <span className="flex-1 truncate text-xs text-[var(--df-fg)]">{c.msg}</span>
                <div className="flex items-center gap-2 flex-shrink-0 text-[10px] text-[var(--df-muted-fg)]">
                  <span>{c.author}</span>
                  <span>{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-4">
        <GlassCard>
          <h3 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">Open Issues</h3>
          <p className="text-3xl font-bold text-[var(--df-fg)]">{project.issues}</p>
          <p className="text-xs text-[var(--df-muted-fg)]">3 critical · 6 high priority</p>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">Deployments</h3>
          <div className="flex flex-col gap-2">
            {DEPLOYMENTS.map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      d.status === 'success'
                        ? 'bg-[var(--df-success)]'
                        : 'bg-[var(--df-warning)] animate-pulse'
                    )}
                  />
                  <span className="font-medium text-[var(--df-fg)]">{d.env}</span>
                </div>
                <span className="font-mono text-[var(--df-muted-fg)]">{d.version}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h3 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">Open Tasks</h3>
          <div className="flex flex-col gap-2">
            {TASKS.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-2 text-xs">
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full flex-shrink-0',
                    t.status === 'done' ? 'bg-[var(--df-success)]' : 'bg-[var(--df-muted-fg)]'
                  )}
                />
                <span className="flex-1 truncate text-[var(--df-fg)]">{t.title}</span>
                <span className="flex-shrink-0 text-[var(--df-muted-fg)]">{t.assignee}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function DeploymentsTab() {
  return (
    <div className="flex flex-col gap-3">
      {DEPLOYMENTS.map((d, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-5 py-4"
        >
          <span
            className={cn(
              'h-2.5 w-2.5 rounded-full flex-shrink-0',
              d.status === 'success'
                ? 'bg-[var(--df-success)]'
                : 'bg-[var(--df-warning)] animate-pulse'
            )}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--df-fg)]">{d.env}</span>
              <Badge variant={d.status === 'success' ? 'success' : 'warning'} size="xs">
                {d.status === 'success' ? 'Success' : 'Running'}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-[var(--df-muted-fg)]">{d.commit}</p>
          </div>
          <div className="text-right text-xs text-[var(--df-muted-fg)]">
            <p className="font-mono text-[var(--df-primary)]">{d.version}</p>
            <p className="mt-0.5">
              {d.time} by {d.by}
            </p>
          </div>
          {d.status === 'running' && <IconButton icon={<Play className="h-4 w-4" />} size="sm" />}
        </div>
      ))}
    </div>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <GlassCard className="flex min-h-64 flex-col items-center justify-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--df-border)] bg-[var(--df-secondary)] text-[var(--df-muted-fg)]">
        <Code2 className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-[var(--df-fg)]">{label}</p>
      <p className="text-xs text-[var(--df-muted-fg)]">
        This module will be available in an upcoming release.
      </p>
    </GlassCard>
  );
}

function ProjectWorkspacePage() {
  const { id } = Route.useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];

  return (
    <PageContainer>
      {/* Back link */}
      <Link
        to="/projects"
        className="flex items-center gap-1.5 text-xs text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All Projects
      </Link>

      <PageHeader
        title={project.name}
        description={project.description}
        badge={
          <Badge variant={project.status === 'active' ? 'success' : 'warning'} size="xs" dot>
            {project.status}
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <IconButton
            icon={<Star className="h-4 w-4" />}
            label="Star project"
            size="sm"
            variant="outline"
          />
          <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
            New Issue
          </GradientButton>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Open Issues', val: project.issues, icon: <AlertCircle className="h-4 w-4" /> },
          { label: 'Active Sprint', val: '#12', icon: <CheckSquare className="h-4 w-4" /> },
          {
            label: 'Team Members',
            val: project.members.length,
            icon: <Users className="h-4 w-4" />,
          },
          { label: 'Last Deploy', val: '2m ago', icon: <Clock className="h-4 w-4" /> },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-4 py-3"
          >
            <span className="text-[var(--df-primary)]">{s.icon}</span>
            <div>
              <p className="text-base font-bold text-[var(--df-fg)]">{s.val}</p>
              <p className="text-[10px] text-[var(--df-muted-fg)]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[var(--df-border)]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex flex-shrink-0 items-center gap-1.5 border-b-2 px-4 py-2.5 text-xs font-medium transition-all',
              activeTab === tab.id
                ? 'border-[var(--df-primary)] text-[var(--df-primary)]'
                : 'border-transparent text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && <OverviewTab project={project} />}
        {activeTab === 'deployments' && <DeploymentsTab />}
        {activeTab !== 'overview' && activeTab !== 'deployments' && (
          <PlaceholderTab label={TABS.find((t) => t.id === activeTab)?.label ?? ''} />
        )}
      </motion.div>
    </PageContainer>
  );
}
