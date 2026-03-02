import { useFetch } from "../../../hooks/useFetch";
import { buildBookSearchUrl } from "../books.api";

export const useBookSearch = (submittedQuery: string) => {
  const url = buildBookSearchUrl(submittedQuery);

  return useFetch({
    URL: url,
    enabled: submittedQuery.length > 0,
  });
};
