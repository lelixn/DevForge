import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, LayoutGrid, List, Folder } from 'lucide-react';
import {
  ForgeCard,
  ForgeButton,
  ForgeBadge,
  ForgeSearch,
  ForgeTabs,
  ForgeEmpty,
} from '@/components/forge';
import { PROJECTS } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/projects/')({ component: ProjectsPage });

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'Active') return matchesSearch && p.status === 'active';
    if (activeFilter === 'In Review') return matchesSearch && p.status === 'review';
    if (activeFilter === 'Backlog') return matchesSearch && p.status === 'backlog';
    if (activeFilter === 'Starred') return matchesSearch && p.starred;
    return matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Projects</h1>
            <ForgeBadge variant="cyan" size="sm" mono>
              {PROJECTS.length} TOTAL
            </ForgeBadge>
          </div>
          <p className="text-xs font-mono text-[var(--df-muted-foreground)] mt-1">
            Active repositories, microservice deployments, and component libraries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ForgeButton
            variant="gradient"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => {}}
          >
            Create Project
          </ForgeButton>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--df-border)] pb-4">
        <ForgeTabs
          tabs={[
            { id: 'All', label: 'All Projects', count: PROJECTS.length },
            {
              id: 'Active',
              label: 'Active',
              count: PROJECTS.filter((p) => p.status === 'active').length,
            },
            { id: 'In Review', label: 'In Review' },
            { id: 'Backlog', label: 'Backlog' },
          ]}
          activeTab={activeFilter}
          onChange={setActiveFilter}
        />

        <div className="flex items-center gap-3">
          <ForgeSearch
            placeholder="Filter projects..."
            onSearch={setSearchQuery}
            className="w-64"
          />

          <div className="flex items-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] p-1">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-1.5 rounded-lg text-xs transition-colors cursor-pointer',
                view === 'grid'
                  ? 'bg-[var(--df-surface-elevated)] text-white'
                  : 'text-[var(--df-muted-foreground)]'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-1.5 rounded-lg text-xs transition-colors cursor-pointer',
                view === 'list'
                  ? 'bg-[var(--df-surface-elevated)] text-white'
                  : 'text-[var(--df-muted-foreground)]'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length > 0 ? (
        <div
          className={cn(
            'grid gap-6',
            view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          )}
        >
          {filteredProjects.map((p) => (
            <ForgeCard
              key={p.id}
              hoverable
              spotlight
              onClick={() => (window.location.href = `/projects/${p.id}`)}
              className="p-6 cursor-pointer space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[var(--df-primary-light)]">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white tracking-tight">{p.name}</h3>
                    <p className="text-xs font-mono text-[var(--df-muted-foreground)]">
                      {p.language}
                    </p>
                  </div>
                </div>

                <ForgeBadge
                  variant={p.status === 'active' ? 'success' : 'warning'}
                  size="sm"
                  dot
                  mono
                >
                  {p.status}
                </ForgeBadge>
              </div>

              <p className="text-xs font-sans text-[var(--df-muted-foreground)] line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[var(--df-border)]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--df-muted-foreground)]">SPRINT PROGRESS</span>
                  <span className="text-white font-bold">{p.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#07070A] rounded-full overflow-hidden border border-[var(--df-border)]">
                  <div
                    className="h-full bg-[var(--df-gradient-accent)]"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </ForgeCard>
          ))}
        </div>
      ) : (
        <ForgeEmpty
          theme="developer"
          title="No projects found"
          description="Try adjusting your filter or search query."
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveFilter('All');
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
}
