import { z } from "zod";

// Bookcard
export const SaveToLibrarySchema = z.object({
  provider: z.string().min(1),
  providerBookId: z.string().min(1),
  title: z.string(),
  authors: z.array(z.string()),
  thumbnail: z.string().nullable().optional(),
  canonicalVolumeLink: z.string().nullable().optional(),
});

export type SaveToLibraryData = z.infer<typeof SaveToLibrarySchema>;

export const parseSaveTolibraryData = (data: unknown): SaveToLibraryData => {
  const result = SaveToLibrarySchema.safeParse(data);
  if (!result.success) throw new Error("Error al enviar los datos");

  return result.data as SaveToLibraryData;
};

// Search Page
export const BooksSearchItemSchema = z.object({
  providerBookId: z.string(),
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

export const BooksSearchSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  code: z.string(),
  data: BooksSearchResponseSchema,
});

export type BooksSearchItem = z.infer<typeof BooksSearchItemSchema>;
export type BooksSearchResponse = z.infer<typeof BooksSearchResponseSchema>;
export type BooksSearchSuccessResponse = z.infer<
  typeof BooksSearchSuccessResponseSchema
>;

// userBooks
const UserBookStatus = [
  "reading",
  "completed",
  "abandoned",
  "want_to_read",
] as const;

const nonEmptyString = z.string().nonempty();
const isoDate = z.iso.datetime();

export const UserBookSchema = z.object({
  id: z.int().positive(),
  userId: z.int().positive(),
  provider: nonEmptyString,
  providerBookId: nonEmptyString,
  title: nonEmptyString,
  authors: z.array(nonEmptyString),
  thumbnail: z.url().nullable(),
  canonicalVolumeLink: z.url().nullable(),
  review: nonEmptyString.nullable(),
  rating: z.int().min(0).max(5).nullable(),
  status: z.enum(UserBookStatus),
  startedAt: isoDate.nullable(),
  finishedAt: isoDate.nullable(),
  createdAt: isoDate,
  updatedAt: isoDate,
});

export type UserBookStatus = (typeof UserBookStatus)[number];
export type UserBookSchemaType = z.infer<typeof UserBookSchema>;

export const getUserBooksResponseSchema = z.array(UserBookSchema)
export type GetUserBookResponse = z.infer<typeof getUserBooksResponseSchema>

export const getUserBooksApiResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  code: z.string(),
  data: getUserBooksResponseSchema,
});