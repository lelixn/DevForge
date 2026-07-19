// Core entities for the DevForge platform

export type Role = 'owner' | 'administrator' | 'engineer' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  key: string;
  description?: string;
  createdAt: string;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'future' | 'completed';
}

export interface Issue {
  id: string;
  projectId: string;
  sprintId?: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  reporterId: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
