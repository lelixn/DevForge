import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Workspace name must be at least 2 characters')
    .max(50, 'Workspace name is too long'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(30, 'Slug is too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  logoUrl: z.string().optional(),
  timezone: z.string().min(1, 'Please select a timezone'),
  size: z.enum(['1-5', '6-15', '16-50', '51-200', '200+']),
  industry: z.enum([
    'software',
    'fintech',
    'healthcare',
    'ecommerce',
    'education',
    'media',
    'gaming',
    'other',
  ]),
});

export type CreateWorkspaceSchemaType = z.infer<typeof createWorkspaceSchema>;
