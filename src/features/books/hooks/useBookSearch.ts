import type { BooksSearchResponse } from "../../../schemas/apiResponseSchema";
import { useFetch } from "../../../shared/hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";
import { type BookSearchQuery } from "../types/books.types";

export const useBookSearch = (submittedQuery: BookSearchQuery) => {
  const url = buildBookSearchUrl(submittedQuery);

  return useFetch<BooksSearchResponse>({
    url,
    enabled: submittedQuery.query.length > 0,
  });
};
