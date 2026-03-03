import { z } from "zod";

export const BooksSearchItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  publisher: z.string().nullable(),
  publishedDate: z.string().nullable(),
  pageCount: z.number().nullable(),
  categories: z.array(z.string()),
  maturityRating: z.string().nullable(),
  thumbnail: z.string().nullable(),
  canonicalVolumeLink: z.string().nullable(),
  description: z.string().nullable(),
  language: z.string().nullable(),
});

export const BooksSearchResponseSchema = z.object({
  provider: z.string(),
  totalItems: z.number().int().min(0),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  items: z.array(BooksSearchItemSchema),
});

export type BooksSearchItem = z.infer<typeof BooksSearchItemSchema>;
export type BooksSearchResponse = z.infer<typeof BooksSearchResponseSchema>;

// Backward-compatible aliases while migration settles.
export type Item = BooksSearchItem;
export type ApiResponse = BooksSearchResponse;
