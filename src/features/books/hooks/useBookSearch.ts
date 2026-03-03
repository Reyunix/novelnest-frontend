import type { BooksSearchResponse } from "../../../schemas/apiResponseSchema";
import { useFetch } from "../../../shared/hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";

export const useBookSearch = (submittedQuery: string) => {
  const url = buildBookSearchUrl(submittedQuery);

  return useFetch<BooksSearchResponse>({
    url,
    enabled: submittedQuery.length > 0,
  });
};
