import { z } from "zod";
import { BooksSearchItemSchema } from "./books.schemas";

const httpUrl = z
  .url()
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol));
export const BookDetailSchema = BooksSearchItemSchema.extend({
  provider: z.string(),
  subtitle: z.string().nullable(),
  thumbnail: httpUrl.nullable(),
  canonicalVolumeLink: httpUrl.nullable(),
  industryIdentifiers: z.array(
    z.object({ type: z.string(), identifier: z.string() }),
  ),
  previewLink: httpUrl.nullable(),
  externalRating: z
    .object({
      average: z.number().min(0).max(5),
      count: z.number().int().nonnegative().nullable(),
    })
    .nullable(),
});
export const ReviewSchema = z.object({
  id: z.number().int().positive(),
  rating: z.number().int().min(1).max(5).nullable(),
  text: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  user: z.object({ name: z.string() }),
});
export const CommunitySchema = z.object({
  average: z.number().min(1).max(5).nullable(),
  ratingsCount: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
  items: z.array(ReviewSchema),
});
const envelope = <T extends z.ZodType>(data: T) =>
  z.object({
    success: z.literal(true),
    code: z.string(),
    message: z.string(),
    data,
  });
export const parseBookDetail = async (response: Response) =>
  envelope(BookDetailSchema).parse(await response.json()).data;
export const parseCommunity = async (response: Response) =>
  envelope(CommunitySchema).parse(await response.json()).data;
export const parseOwnReview = async (response: Response) =>
  envelope(ReviewSchema.nullable()).parse(await response.json()).data;
export type BookDetail = z.infer<typeof BookDetailSchema>;
export type Review = z.infer<typeof ReviewSchema>;
