import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  ForgeCard,
  ForgeButton,
  ForgeBadge,
  ForgeAvatar,
  ForgeSearch,
  ForgeTabs,
} from '@/components/forge';
import { TASKS } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/tasks/')({ component: TasksPage });

const COLUMNS = [
  { id: 'todo' as const, label: 'To Do', color: 'bg-[var(--df-muted-foreground)]' },
  { id: 'inprogress' as const, label: 'In Progress', color: 'bg-[var(--df-primary)]' },
  { id: 'review' as const, label: 'In Review', color: 'bg-[var(--df-warning)]' },
  { id: 'done' as const, label: 'Done', color: 'bg-[var(--df-success)]' },
];

function TasksPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('board');

  const filteredTasks = TASKS.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Sprint Tasks & Backlog</h1>
            <ForgeBadge variant="cyan" size="sm" mono>
              {TASKS.length} TASKS
            </ForgeBadge>
          </div>
          <p className="text-xs font-mono text-[var(--df-muted-foreground)] mt-1">
            Kanban board tracking active sprint deliverables & PR reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ForgeButton variant="gradient" size="md" leftIcon={<Plus className="h-4 w-4" />}>
            Create Task
          </ForgeButton>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--df-border)] pb-4">
        <ForgeTabs
          tabs={[
            { id: 'board', label: 'Kanban Board' },
            { id: 'backlog', label: 'Backlog List' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <ForgeSearch placeholder="Filter tasks..." onSearch={setSearch} className="w-64" />
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', col.color)} />
                  <h3 className="text-xs font-mono font-bold text-white uppercase">{col.label}</h3>
                </div>
                <ForgeBadge variant="default" size="sm" mono>
                  {colTasks.length}
                </ForgeBadge>
              </div>

              <div className="space-y-3 min-h-[400px]">
                {colTasks.map((t) => (
                  <ForgeCard
                    key={t.id}
                    hoverable
                    spotlight
                    className="p-4 space-y-3 bg-[var(--df-surface-elevated)] border-[var(--df-border)] cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono text-[var(--df-muted-foreground)]">
                        #{t.id}
                      </span>
                      <ForgeBadge
                        variant={t.priority === 'high' ? 'danger' : 'secondary'}
                        size="sm"
                        mono
                      >
                        {t.priority}
                      </ForgeBadge>
                    </div>

                    <h4 className="text-xs font-semibold text-white tracking-tight line-clamp-2">
                      {t.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--df-border)] text-[10px] font-mono text-[var(--df-muted-foreground)]">
                      <span>{t.label}</span>
                      <ForgeAvatar name={t.assignee} size="xs" />
                    </div>
                  </ForgeCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
