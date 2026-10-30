import { UserBookSchema } from "../schemas/books.schemas";
import type { z } from "zod";

// View model shared by both transports; local demo records have no user identity.
export const LibraryEntrySchema = UserBookSchema.omit({ userId: true });
export type LibraryEntry = z.infer<typeof LibraryEntrySchema>;
