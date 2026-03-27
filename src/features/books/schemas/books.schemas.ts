import { z } from "zod";

const nonEmptyString = z.string().nonempty();
const isoDate = z.iso.datetime();

// Bookcard
export const SaveToLibrarySchema = z.object({
  provider: nonEmptyString,
  providerBookId: nonEmptyString,
  title: nonEmptyString,
  authors: z.array(nonEmptyString),
  thumbnail: nonEmptyString.nullable().optional(),
  canonicalVolumeLink: nonEmptyString.nullable().optional(),
});

export type SaveToLibraryData = z.infer<typeof SaveToLibrarySchema>;

export const parseSaveTolibraryData = (data: unknown): SaveToLibraryData => {
  const result = SaveToLibrarySchema.safeParse(data);
  if (!result.success) throw new Error("Error al enviar los datos");

  return result.data as SaveToLibraryData;
};

// Search Page
export const BooksSearchItemSchema = z.object({
  providerBookId: nonEmptyString,
  title: nonEmptyString,
  authors: z.array(nonEmptyString),
  publisher: nonEmptyString.nullable(),
  publishedDate: nonEmptyString.nullable(),
  pageCount: z.number().nullable(),
  categories: z.array(nonEmptyString),
  maturityRating: nonEmptyString.nullable(),
  thumbnail: nonEmptyString.nullable(),
  canonicalVolumeLink: nonEmptyString.nullable(),
  description: nonEmptyString.nullable(),
  language: nonEmptyString.nullable(),
});

export const BooksSearchResponseSchema = z.object({
  provider: nonEmptyString,
  totalItems: z.number().int().min(0),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  items: z.array(BooksSearchItemSchema),
});

export const BooksSearchSuccessResponseSchema = z.object({
  success: z.literal(true),
  message: nonEmptyString,
  code: nonEmptyString,
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

export const getUserBooksResponseSchema = z.array(UserBookSchema);
export type GetUserBookResponse = z.infer<typeof getUserBooksResponseSchema>;

export const getUserBooksApiResponseSchema = z.object({
  success: z.literal(true),
  message: nonEmptyString,
  code: nonEmptyString,
  data: getUserBooksResponseSchema,
});

export const getUserBookApiResponseSchema = z.object({
  success: z.literal(true),
  message: nonEmptyString,
  code: nonEmptyString,
  data: UserBookSchema,
});

// userLists
export const UserListSchema = z.object({
  id: z.int().positive(),
  userId: z.int().positive(),
  name: nonEmptyString,
  description: nonEmptyString.nullable(),
  isDefault: z.boolean(),
  isPrivate: z.boolean(),
  createdAt: isoDate,
  updatedAt: isoDate,
});

export const UserListSchemaApiResponse = z.object({
  success: z.boolean(),
  message: nonEmptyString,
  code: nonEmptyString,
  data: z.array(UserListSchema),
});

export type UserListSchemaType = z.infer<typeof UserListSchema>;
export type UserListSchemaApiResponseType = z.infer<
  typeof UserListSchemaApiResponse
>;
