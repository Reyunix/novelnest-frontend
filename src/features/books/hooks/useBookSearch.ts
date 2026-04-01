import { useFetch } from "../../../shared/hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";
import {
  type BooksSearchSuccessResponse,
} from "../schemas/books.schemas";

export const useBookSearch = (submittedQuery: URLSearchParams) => {
  const url = buildBookSearchUrl(submittedQuery);

  return useFetch<BooksSearchSuccessResponse>({
    url,
    enabled: url !== "",
  });
};
