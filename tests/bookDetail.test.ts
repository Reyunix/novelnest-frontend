import {
  readReviewDraft,
  writeReviewDraft,
} from "../src/features/books/reviewDraft";
import { describe, expect, test } from "bun:test";
import {
  bookLink,
  isKnownAuthor,
  searchOrigin,
} from "../src/features/books/bookLinks";
import {
  CommunitySchema,
  BookDetailSchema,
} from "../src/features/books/schemas/bookDetail.schemas";

describe("book detail navigation and contracts", () => {
  test("detail links encode identity and author placeholders remain noninteractive", () => {
    expect(bookLink("google", "a_b-1")).toBe("/libros/google/a_b-1");
    expect(bookLink("provider", "id/segment")).toBe(
      "/libros/provider/id%2Fsegment",
    );
    for (const author of [
      "",
      "  ",
      "Autor desconocido",
      " UNKNOWN ",
      "Unknown Author",
    ])
      expect(isKnownAuthor(author)).toBe(false);
    expect(isKnownAuthor("Ursula K. Le Guin")).toBe(true);
  });
  test("return to results preserves all query parameters and rejects external destinations", () => {
    const search =
      "/buscar?query=Le+Guin&filterState=author&sortBy=newest&page=3";
    expect(searchOrigin(search)).toBe(search);
    for (const value of [
      "//evil.test/buscar",
      "https://evil.test/buscar",
      "/mis-libros",
      "/\\evil.test/buscar",
      "javascript:alert(1)",
      null,
    ])
      expect(searchOrigin(value)).toBeNull();
  });
  test("community uses null for no votes and validates review identities", () => {
    const empty = {
      average: null,
      ratingsCount: 0,
      totalItems: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      items: [],
    };
    expect(CommunitySchema.parse(empty).average).toBeNull();
    expect(CommunitySchema.safeParse({ ...empty, average: 7 }).success).toBe(
      false,
    );
    expect(
      CommunitySchema.safeParse({ ...empty, items: [{ rating: 5 }] }).success,
    ).toBe(false);
  });
  test("bibliography accepts incomplete editions and rejects executable links", () => {
    const book = {
      provider: "google",
      providerBookId: "edition",
      title: "Libro",
      authors: [],
      publisher: null,
      publishedDate: "1999",
      pageCount: null,
      categories: [],
      maturityRating: null,
      thumbnail: null,
      canonicalVolumeLink: null,
      description: null,
      language: null,
      subtitle: null,
      industryIdentifiers: [],
      previewLink: null,
      externalRating: null,
    };
    expect(BookDetailSchema.parse(book).publishedDate).toBe("1999");
    expect(
      BookDetailSchema.safeParse({ ...book, previewLink: "javascript:bad" })
        .success,
    ).toBe(false);
  });
});

test("review drafts survive session expiry, stay isolated by user and clear after publishing", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
  const empty = { rating: "", text: "" };
  const draft = { rating: "4", text: "Borrador pendiente" };
  writeReviewDraft("user-a:edition", draft, storage);
  expect(readReviewDraft("user-a:edition", empty, storage)).toEqual(draft);
  expect(readReviewDraft("user-b:edition", empty, storage)).toEqual(empty);
  writeReviewDraft("user-a:edition", null, storage);
  expect(readReviewDraft("user-a:edition", empty, storage)).toEqual(empty);
  values.set("broken", "not JSON");
  expect(readReviewDraft("broken", empty, storage)).toEqual(empty);
});
