import { z } from 'zod';

export const subtaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Subtask title cannot be empty'),
  completed: z.boolean().default(false),
});

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  category: z.enum(['work', 'personal', 'learning', 'health', 'other']).optional(),
  deadline: z.string().optional(),
  tags: z.array(z.string()).optional(),
  subtasks: z.array(subtaskSchema).optional(),
  recurring: z.enum(['none', 'daily', 'weekly', 'monthly']).optional(),
  order: z.number().optional(),
});

export const updateTodoSchema = createTodoSchema.partial();
