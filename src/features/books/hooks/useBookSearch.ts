import type { BooksSearchSuccessResponse } from "../../../schemas/api.response.schema";
import { useFetch } from "../../../shared/hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";
import { type BookSearchQuery } from "../types/books.types";

export const useBookSearch = (submittedQuery: BookSearchQuery) => {
  const url = buildBookSearchUrl(submittedQuery);

  return useFetch<BooksSearchSuccessResponse>({
    url,
    enabled: submittedQuery.query.length > 0,
  });
};
