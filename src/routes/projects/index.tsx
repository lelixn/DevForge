import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  LayoutGrid,
  List,
  Search,
  Filter,
  Star,
  StarOff,
  GitBranch,
  AlertCircle,
  Clock,
  MoreHorizontal,
  Folder,
} from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { Badge, AvatarStack } from '@/components/shared/badge';
import { EmptyState } from '@/components/shared/empty-state';
import { PROJECTS, STATUS_CONFIG } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/projects/')({ component: ProjectsPage });

const FILTERS = ['All', 'Active', 'In Review', 'Backlog', 'Starred'];
const LANGUAGES = ['TypeScript', 'Go', 'Rust', 'Python', 'Node.js', 'Kotlin'];

function ProjectCard({ project, view }: { project: (typeof PROJECTS)[0]; view: 'grid' | 'list' }) {
  const [starred, setStarred] = useState(project.starred);
  const status = STATUS_CONFIG[project.status];

  if (view === 'list') {
    return (
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
        className="flex cursor-pointer items-center gap-4 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-5 py-4 transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)]/30"
      >
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${project.color}20` }}
        >
          <Folder className="h-5 w-5" style={{ color: project.color }} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--df-fg)]">{project.name}</span>
            <Badge
              variant={
                project.status === 'active'
                  ? 'success'
                  : project.status === 'review'
                    ? 'warning'
                    : 'default'
              }
              size="xs"
              dot
            >
              {status.label}
            </Badge>
          </div>
          <p className="mt-0.5 truncate text-xs text-[var(--df-muted-fg)]">{project.description}</p>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <div className="text-right">
            <p className="text-xs text-[var(--df-muted-fg)]">Progress</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-1 w-20 overflow-hidden rounded-full bg-[var(--df-secondary)]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                />
              </div>
              <span className="text-xs font-medium text-[var(--df-fg)]">{project.progress}%</span>
            </div>
          </div>
          <AvatarStack avatars={project.members} />
          <div className="flex items-center gap-1 text-xs text-[var(--df-muted-fg)]">
            <AlertCircle className="h-3.5 w-3.5" />
            {project.issues}
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--df-muted-fg)]">
            <Clock className="h-3.5 w-3.5" />
            {project.updatedAt}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            icon={
              starred ? (
                <Star className="h-4 w-4 text-[var(--df-warning)]" />
              ) : (
                <StarOff className="h-4 w-4" />
              )
            }
            size="xs"
            onClick={() => setStarred((p) => !p)}
          />
          <IconButton icon={<MoreHorizontal className="h-4 w-4" />} size="xs" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className="group relative flex cursor-pointer flex-col gap-4 rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5 transition-all hover:border-[var(--df-border-strong)] hover:shadow-[var(--shadow-elevated)]"
    >
      {/* Top bar color accent */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
        style={{ backgroundColor: project.color }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${project.color}20` }}
        >
          <Folder className="h-5 w-5" style={{ color: project.color }} />
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <IconButton
            icon={
              starred ? (
                <Star className="h-4 w-4 text-[var(--df-warning)]" />
              ) : (
                <StarOff className="h-4 w-4" />
              )
            }
            size="xs"
            onClick={() => setStarred((p) => !p)}
          />
          <IconButton icon={<MoreHorizontal className="h-4 w-4" />} size="xs" />
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--df-fg)]">{project.name}</h3>
          <Badge
            variant={
              project.status === 'active'
                ? 'success'
                : project.status === 'review'
                  ? 'warning'
                  : 'default'
            }
            size="xs"
            dot
          >
            {status.label}
          </Badge>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-[var(--df-muted-fg)]">
          {project.description}
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] text-[var(--df-muted-fg)]">Sprint Progress</span>
          <span className="text-[10px] font-medium text-[var(--df-fg)]">{project.progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--df-secondary)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--df-border)] pt-3">
        <AvatarStack avatars={project.members} />
        <div className="flex items-center gap-3 text-[10px] text-[var(--df-muted-fg)]">
          <span className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            {project.language}
          </span>
          <span className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {project.issues}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {project.updatedAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PROJECTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All' || filter === 'Starred'
        ? filter !== 'Starred' || p.starred
        : p.status === filter.toLowerCase().replace(' ', '');
    return matchSearch && matchFilter;
  });

  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        description={`${PROJECTS.length} projects across all workspaces`}
      >
        <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
          New Project
        </GradientButton>
      </PageHeader>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                filter === f
                  ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                  : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--df-muted-fg)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="h-8 w-48 rounded-lg border border-[var(--df-border)] bg-[var(--df-input)] pl-8 pr-3 text-xs text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:border-[var(--df-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20"
            />
          </div>
          <IconButton
            icon={<Filter className="h-4 w-4" />}
            label="Filter"
            size="sm"
            variant="outline"
          />
          <div className="flex overflow-hidden rounded-lg border border-[var(--df-border)]">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'flex h-8 w-8 items-center justify-center transition-colors',
                view === 'grid'
                  ? 'bg-[var(--df-secondary)] text-[var(--df-fg)]'
                  : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)]'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'flex h-8 w-8 items-center justify-center transition-colors',
                view === 'list'
                  ? 'bg-[var(--df-secondary)] text-[var(--df-fg)]'
                  : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)]'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Language filter chips */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            className="rounded-full border border-[var(--df-border)] bg-[var(--df-secondary)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--df-muted-fg)] transition-all hover:border-[var(--df-border-strong)] hover:text-[var(--df-fg)]"
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Project Grid/List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Folder className="h-6 w-6" />}
          title="No projects found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={
            <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
              Create Project
            </GradientButton>
          }
        />
      ) : (
        <motion.div
          layout
          className={cn(
            view === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : 'flex flex-col gap-2'
          )}
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} view={view} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageContainer>
  );
}
