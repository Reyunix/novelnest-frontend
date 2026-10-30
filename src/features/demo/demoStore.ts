import { z } from "zod";
import { LibraryEntrySchema } from "../books/types/libraryEntry";
import type {
  SaveToLibraryData,
  UserBookStatus,
} from "../books/schemas/books.schemas";
import {
  BookDetailSchema,
  ReviewSchema,
  type BookDetail,
} from "../books/schemas/bookDetail.schemas";
import { demoCatalog, demoBookKey } from "./fixtures";

export const DEMO_STORAGE_KEY = "novelnest:demo:v1";
export const DemoStateSchema = z.object({
  version: z.literal(1),
  epoch: z.number().int().nonnegative().default(0),
  active: z.boolean(),
  nextId: z.number().int().positive(),
  books: z.array(LibraryEntrySchema).max(200),
  reviews: z.record(z.string(), ReviewSchema),
  snapshots: z.record(z.string(), BookDetailSchema),
});
export type DemoState = z.infer<typeof DemoStateSchema>;
type StoragePort = Pick<Storage, "getItem" | "setItem">;
export const initialDemoState = (): DemoState => ({
  version: 1,
  epoch: 0,
  active: false,
  nextId: 100,
  books: demoCatalog.slice(0, 3).map((book, index) => ({
    id: index + 1,
    provider: book.provider,
    providerBookId: book.providerBookId,
    title: book.title,
    authors: book.authors,
    thumbnail: book.thumbnail,
    canonicalVolumeLink: book.canonicalVolumeLink,
    rating: null,
    review: null,
    status: (["reading", "want_to_read", "completed"] as const)[index]!,
    startedAt: null,
    finishedAt: null,
    createdAt: "2026-01-01T12:00:00.000Z",
    updatedAt: "2026-01-01T12:00:00.000Z",
  })),
  reviews: {},
  snapshots: {},
});

export const createDemoStore = (providedStorage?: StoragePort) => {
  let storage: StoragePort | undefined;
  let state = initialDemoState();
  let persistent = true;
  try {
    storage = providedStorage ?? globalThis.localStorage;
    if (!storage) throw new Error("No storage");
    const raw = storage.getItem(DEMO_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = DemoStateSchema.safeParse(JSON.parse(raw));
        if (parsed.success) state = parsed.data;
      } catch {
        /* recover seeds */
      }
    }
    storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    persistent = false;
  }
  let snapshot = { state, persistent };
  const listeners = new Set<() => void>();
  const emit = () => {
    try {
      if (!storage) throw new Error("No storage");
      storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
    } catch {
      persistent = false;
    }
    snapshot = { state, persistent };
    listeners.forEach((listener) => listener());
  };
  const commit = (next: DemoState) => {
    state = DemoStateSchema.parse(next);
    emit();
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    enter: () => commit({ ...state, active: true }),
    leave: () => {
      if (state.active) commit({ ...state, active: false });
    },
    reset: () => {
      try {
        for (const key of Object.keys(globalThis.sessionStorage))
          if (key.startsWith("novelnest:demo-draft:"))
            globalThis.sessionStorage.removeItem(key);
      } catch {
        /* optional storage */
      }
      commit({ ...initialDemoState(), active: true, epoch: state.epoch + 1 });
    },
    save: (book: SaveToLibraryData) => {
      if (
        state.books.some(
          (entry) =>
            entry.provider === book.provider &&
            entry.providerBookId === book.providerBookId,
        )
      )
        return;
      if (state.books.length >= 200) throw new Error("DEMO_FULL");
      const now = new Date().toISOString();
      commit({
        ...state,
        nextId: state.nextId + 1,
        books: [
          {
            ...book,
            id: state.nextId,
            thumbnail: book.thumbnail ?? null,
            canonicalVolumeLink: book.canonicalVolumeLink ?? null,
            status: "want_to_read",
            rating: null,
            review: null,
            startedAt: null,
            finishedAt: null,
            createdAt: now,
            updatedAt: now,
          },
          ...state.books,
        ],
      });
    },
    remove: (id: number) =>
      commit({ ...state, books: state.books.filter((book) => book.id !== id) }),
    changeStatus: (id: number, status: UserBookStatus) =>
      commit({
        ...state,
        books: state.books.map((book) =>
          book.id === id
            ? { ...book, status, updatedAt: new Date().toISOString() }
            : book,
        ),
      }),
    remember: (book: BookDetail) => {
      const key = demoBookKey(book.provider, book.providerBookId);
      if (JSON.stringify(state.snapshots[key]) === JSON.stringify(book)) return;
      const entries = Object.entries(state.snapshots)
        .filter(([existing]) => existing !== key)
        .slice(-199);
      commit({
        ...state,
        snapshots: { ...Object.fromEntries(entries), [key]: book },
      });
    },
    saveReview: (
      key: string,
      input: { rating: number | null; text: string | null } | null,
    ) => {
      if (input === null) {
        const reviews = { ...state.reviews };
        delete reviews[key];
        commit({ ...state, reviews });
        return null;
      }
      const text = input.text?.trim() || null;
      if ((!input.rating && !text) || (text?.length ?? 0) > 5000)
        throw new Error("INVALID_DEMO_REVIEW");
      const previous = state.reviews[key];
      const now = new Date().toISOString();
      const review = ReviewSchema.parse({
        id: previous?.id ?? state.nextId,
        ...input,
        text,
        user: { name: "Tú (demo)" },
        createdAt: previous?.createdAt ?? now,
        updatedAt: now,
      });
      commit({
        ...state,
        nextId: previous ? state.nextId : state.nextId + 1,
        reviews: { ...state.reviews, [key]: review },
      });
      return review;
    },
  };
};
