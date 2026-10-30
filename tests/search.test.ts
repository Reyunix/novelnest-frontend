import { describe, expect, test } from "bun:test";
import {
  readSearchQuery,
  SEARCH_PAGE_SIZE,
  searchLink,
} from "../src/features/books/searchQuery";
import { buildBookSearchUrl } from "../src/features/books/books.api";

describe("search links and backend pagination", () => {
  test("shared author links preserve text, filter and ordering", () => {
    const params = new URL(
      searchLink("Miguel de Cervantes", "author"),
      "http://localhost",
    ).searchParams;
    expect(readSearchQuery(params)).toEqual({
      query: "Miguel de Cervantes",
      filterState: "author",
      sortBy: "relevance",
      page: 1,
    });
  });
  test("the second page sends the contract accepted by the backend", () => {
    const url = new URL(
      buildBookSearchUrl(
        new URLSearchParams({
          query: " Dune ",
          filterState: "title",
          sortBy: "newest",
          page: "2",
        }),
      ),
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      title: "Dune",
      sortBy: "newest",
      page: "2",
      limit: String(SEARCH_PAGE_SIZE),
    });
    expect(url.pathname).toBe("/api/v1/books/search");
  });
  test("invalid URL parameters fall back to valid API values", () => {
    for (const page of [
      "-1",
      "0",
      "1.5",
      "NaN",
      "Infinity",
      "9007199254740993",
    ]) {
      const params = new URLSearchParams({
        query: "Dune",
        filterState: "bad",
        sortBy: "bad",
        page,
      });
      expect(readSearchQuery(params)).toEqual({
        query: "Dune",
        filterState: "all",
        sortBy: "relevance",
        page: 1,
      });
    }
  });
  test("empty searches make no catalogue request", () => {
    expect(buildBookSearchUrl(new URLSearchParams("query=+++"))).toBe("");
  });
});
