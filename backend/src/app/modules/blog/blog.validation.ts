import { z } from 'zod';
import { BlogCategory } from './blog.interface';

export const blogValidations = {
  create: z.object({
    body: z.object({
      title: z.string().min(1, 'Title is required'),
      thumbnail: z.string().optional(),
      content: z.string().min(1, 'Content is required'),
      category: z.nativeEnum(BlogCategory),
    }),
  }),
  update: z.object({
    body: z.object({
      title: z.string().min(1, 'Title is required').optional(),
      thumbnail: z.string().optional(),
      content: z.string().min(1, 'Content is required').optional(),
      category: z.nativeEnum(BlogCategory).optional(),
    }),
  }),
};
