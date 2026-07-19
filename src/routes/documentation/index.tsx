import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Plus, Search, Clock, Star, Hash } from 'lucide-react';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/documentation/')({ component: DocumentationPage });

const DOC_TREE = [
  {
    id: '1',
    label: 'Getting Started',
    icon: '🚀',
    children: [
      { id: '1.1', label: 'Introduction', active: true },
      { id: '1.2', label: 'Quick Start Guide' },
      { id: '1.3', label: 'Core Concepts' },
    ],
  },
  {
    id: '2',
    label: 'Architecture',
    icon: '🏗️',
    children: [
      { id: '2.1', label: 'System Overview' },
      { id: '2.2', label: 'Database Design' },
      { id: '2.3', label: 'API Design Principles' },
    ],
  },
  {
    id: '3',
    label: 'API Reference',
    icon: '📡',
    children: [
      { id: '3.1', label: 'Authentication' },
      { id: '3.2', label: 'Projects API' },
      { id: '3.3', label: 'Tasks API' },
      { id: '3.4', label: 'Webhooks' },
    ],
  },
  {
    id: '4',
    label: 'Deployment',
    icon: '🚢',
    children: [
      { id: '4.1', label: 'Docker Setup' },
      { id: '4.2', label: 'Kubernetes' },
      { id: '4.3', label: 'CI/CD Pipeline' },
    ],
  },
];

const MARKDOWN_CONTENT = `# Introduction to DevForge

DevForge is an **AI-powered engineering workspace** that combines project management, team collaboration, API workspace, documentation, sprint planning, analytics, and AI features into one modern SaaS platform.

## What is DevForge?

DevForge is designed for engineering teams who want to move fast without sacrificing quality. It provides:

- **Unified Workspace** — Manage all your projects from a single platform
- **AI Co-pilot** — Get intelligent suggestions for code, documentation, and architecture
- **API Workspace** — Test and document your APIs in one place
- **Sprint Planning** — Agile tools built for modern engineering teams

## Core Concepts

### Workspaces
A workspace is the top-level container for your organization. All projects, teams, and settings live within a workspace.

### Projects
Projects are collections of tasks, code repositories, documentation, and deployments.

\`\`\`typescript
// Example: Create a project
const project = await devforge.projects.create({
  name: 'My API',
  description: 'RESTful API built with Go',
  visibility: 'private',
});
\`\`\`

### Sprints
Sprints are time-boxed iterations (typically 2 weeks) where teams plan and execute work.
`;

function DocTreeItem({ item, depth = 0 }: { item: (typeof DOC_TREE)[0]; depth?: number }) {
  const [expanded, setExpanded] = useState(item.id === '1');
  const hasChildren = 'children' in item && item.children;

  return (
    <div>
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--df-muted-fg)] transition-colors hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]"
        style={{ paddingLeft: `${depth * 12 + 10}px` }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 flex-shrink-0 transition-transform',
              expanded && 'rotate-90'
            )}
          />
        ) : (
          <span className="w-3.5" />
        )}
        {item.icon && <span className="text-sm">{item.icon}</span>}
        <span className="truncate font-medium">{item.label}</span>
      </button>
      {hasChildren && expanded && (
        <div>
          {item.children!.map((child: { id: string; label: string; active?: boolean }) => (
            <button
              key={child.id}
              className={cn(
                'flex w-full items-center gap-1.5 truncate rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors',
                child.active
                  ? 'bg-[var(--df-primary)]/10 text-[var(--df-primary)] font-medium'
                  : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
              )}
              style={{ paddingLeft: `${(depth + 1) * 12 + 10}px` }}
            >
              <FileText className="h-3 w-3 flex-shrink-0" />
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="prose prose-invert max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith('# '))
          return (
            <h1 key={i} className="mb-4 mt-0 text-2xl font-bold text-[var(--df-fg)]">
              {line.slice(2)}
            </h1>
          );
        if (line.startsWith('## '))
          return (
            <h2 key={i} className="mb-3 mt-6 text-lg font-bold text-[var(--df-fg)]">
              {line.slice(3)}
            </h2>
          );
        if (line.startsWith('### '))
          return (
            <h3 key={i} className="mb-2 mt-5 text-base font-semibold text-[var(--df-fg)]">
              {line.slice(4)}
            </h3>
          );
        if (line.startsWith('- **')) {
          const parts = line.replace('- ', '').split('**');
          return (
            <li key={i} className="mb-1.5 ml-4 text-sm text-[var(--df-muted-fg)]">
              <strong className="text-[var(--df-fg)]">{parts[1]}</strong>
              {parts[2]}
            </li>
          );
        }
        if (line.startsWith('```'))
          return (
            <div
              key={i}
              className="my-3 overflow-hidden rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]"
            >
              <div className="flex items-center gap-2 border-b border-[var(--df-border)] px-4 py-2">
                <span className="text-[10px] font-mono text-[var(--df-muted-fg)]">typescript</span>
              </div>
            </div>
          );
        if (line.trim() === '' || line.startsWith('`')) return <span key={i} />;
        return (
          <p key={i} className="mb-2 text-sm leading-relaxed text-[var(--df-muted-fg)]">
            {line}
          </p>
        );
      })}
    </div>
  );
}

function DocumentationPage() {
  const [search, setSearch] = useState('');
  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Doc tree sidebar */}
      <div className="flex w-60 flex-shrink-0 flex-col border-r border-[var(--df-border)] bg-[var(--df-sidebar)]">
        <div className="border-b border-[var(--df-border)] p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--df-muted-fg)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs..."
              className="h-7 w-full rounded-lg border border-[var(--df-border)] bg-[var(--df-input)] pl-8 pr-3 text-xs text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {DOC_TREE.map((item) => (
            <DocTreeItem key={item.id} item={item} />
          ))}
        </div>
        <div className="border-t border-[var(--df-border)] p-3">
          <button className="flex w-full items-center gap-2 rounded-lg border border-dashed border-[var(--df-border)] px-3 py-2 text-xs text-[var(--df-muted-fg)] transition-all hover:border-[var(--df-border-strong)] hover:text-[var(--df-fg)]">
            <Plus className="h-3.5 w-3.5" /> New Page
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Doc header */}
        <div className="flex items-center justify-between border-b border-[var(--df-border)] px-8 py-4">
          <div className="flex items-center gap-2 text-xs text-[var(--df-muted-fg)]">
            <span>Getting Started</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--df-fg)]">Introduction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-[var(--df-muted-fg)]">
              <Clock className="h-3.5 w-3.5" />
              Updated 2 hours ago
            </span>
            <IconButton icon={<Star className="h-4 w-4" />} size="xs" label="Star" />
            <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
              Edit
            </GradientButton>
          </div>
        </div>

        {/* Doc body */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <MarkdownRenderer content={MARKDOWN_CONTENT} />
            </motion.div>
          </div>

          {/* Table of contents */}
          <div className="w-52 flex-shrink-0 border-l border-[var(--df-border)] px-4 py-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
              On This Page
            </p>
            {[
              'Introduction',
              'What is DevForge?',
              'Core Concepts',
              'Workspaces',
              'Projects',
              'Sprints',
            ].map((heading) => (
              <button
                key={heading}
                className="mb-1 flex w-full items-center gap-1.5 text-xs text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors text-left"
              >
                <Hash className="h-3 w-3 flex-shrink-0" />
                {heading}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
