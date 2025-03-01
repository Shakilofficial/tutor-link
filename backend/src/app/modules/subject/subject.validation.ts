import { z } from 'zod';

export const subjectValidations = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      gradeLevel: z.string().min(1, 'Grade level is required'),
      category: z.string().min(1, 'Category is required'),
    }),
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      gradeLevel: z.string().min(1, 'Grade level is required'),
      category: z.string().min(1, 'Category is required'),
    }),
  }),
};
