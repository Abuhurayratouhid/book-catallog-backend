import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Category title is required',
    }),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
};
