import { useFetch } from "../../../shared/hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";
import { BooksSearchSuccessResponseSchema } from "../schemas/books.schemas";

const parseSearchResponse = async (response: Response) =>
  BooksSearchSuccessResponseSchema.parse(await response.json());
export const useBookSearch = (params: URLSearchParams) => {
  const url = buildBookSearchUrl(params);
  return useFetch({
    url,
    enabled: Boolean(url),
    parseResponse: parseSearchResponse,
  });
};
