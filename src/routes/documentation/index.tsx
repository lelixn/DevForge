import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import {
  ForgeBlueprint,
  ForgeCard,
  ForgeButton,
  ForgeBadge,
  ForgeSearch,
} from '@/components/forge';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/documentation/')({ component: DocumentationPage });

const DOC_TREE = [
  {
    id: '1',
    label: 'Getting Started',
    children: [
      { id: '1.1', label: 'Introduction', active: true },
      { id: '1.2', label: 'Quick Start Guide' },
      { id: '1.3', label: 'Core Concepts' },
    ],
  },
  {
    id: '2',
    label: 'Architecture',
    children: [
      { id: '2.1', label: 'System Overview' },
      { id: '2.2', label: 'Database Design' },
      { id: '2.3', label: 'API Design Principles' },
    ],
  },
  {
    id: '3',
    label: 'API Reference',
    children: [
      { id: '3.1', label: 'Authentication' },
      { id: '3.2', label: 'Projects API' },
      { id: '3.3', label: 'Tasks API' },
    ],
  },
];

function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState('1.1');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-6">
      <ForgeBlueprint
        title="SYSTEM DOCUMENTATION & TECHNICAL WIKI"
        systemId="DOCS_WIKI_01"
        revision="v3.1.0"
        status="UPDATED"
        headerActions={
          <ForgeButton variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Doc Page
          </ForgeButton>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[620px]">
          {/* Navigation Tree Sidebar */}
          <div className="space-y-4 border-r border-[rgba(6,182,212,0.15)] pr-4">
            <ForgeSearch placeholder="Search docs..." />

            <div className="space-y-4 pt-2">
              {DOC_TREE.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[var(--df-accent)] uppercase tracking-wider">
                    {cat.label}
                  </span>
                  <div className="space-y-1 pl-2">
                    {cat.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedDoc(child.id)}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-sans transition-colors cursor-pointer text-left',
                          selectedDoc === child.id
                            ? 'bg-[rgba(6,182,212,0.15)] text-white border border-[rgba(6,182,212,0.3)] font-semibold'
                            : 'text-[var(--df-muted-foreground)] hover:text-white'
                        )}
                      >
                        <FileText className="h-3.5 w-3.5 text-[var(--df-muted-foreground)]" />
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Markdown Preview Reader */}
          <div className="lg:col-span-3 space-y-6">
            <ForgeCard spotlight blueprint className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(6,182,212,0.2)] pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
                    Introduction to DevForge Core
                  </h1>
                  <p className="text-xs font-mono text-[var(--df-muted-foreground)]">
                    LAST UPDATED: 2 HOURS AGO // BY ALEX MERCER
                  </p>
                </div>
                <ForgeBadge variant="cyan" size="sm" mono>
                  CONFIDENTIAL // INTERNAL
                </ForgeBadge>
              </div>

              <div className="prose prose-invert max-w-none text-sm text-[var(--df-muted-foreground)] leading-relaxed space-y-4 font-sans">
                <p>
                  DevForge is an AI-powered engineering platform designed to combine microservice
                  architecture modeling, API workspace debugging, sprint planning, and system
                  documentation into one cohesive developer OS.
                </p>

                <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider text-[var(--df-accent)] pt-4">
                  Core Engineering Principles
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Neo Industrial Aesthetics:</strong> Developer-first dark interface with
                    crisp IBM Plex Mono typography.
                  </li>
                  <li>
                    <strong>Sub-50ms Response SLAs:</strong> Built for performance and instant
                    keybinding navigation.
                  </li>
                  <li>
                    <strong>Built-in AI Reasoning:</strong> Continuous code quality auditing and
                    automated sprint summaries.
                  </li>
                </ul>

                <div className="rounded-xl bg-[#07070A] p-4 border border-[var(--df-border)] font-mono text-xs text-[#34D399] mt-4">
                  <pre>{`// Quick Initialization
import { DevForgeClient } from '@devforge/core';

const client = new DevForgeClient({
  apiKey: process.env.FORGE_API_KEY,
  region: 'us-east-1',
});`}</pre>
                </div>
              </div>
            </ForgeCard>
          </div>
        </div>
      </ForgeBlueprint>
    </div>
  );
}
