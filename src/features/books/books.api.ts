import { request, jsonHeaders } from "../../shared/http/request";
import { parseOwnReview } from "./schemas/bookDetail.schemas";
import { API_ENDPOINTS } from "../../shared/config/config.api";
import { readSearchQuery, SEARCH_PAGE_SIZE } from "./searchQuery";

export const buildBookSearchUrl = (params: URLSearchParams): string => {
  const search = readSearchQuery(params);
  if (!search.query) return "";
  const url = new URL(API_ENDPOINTS.BOOKS_SEARCH);
  url.searchParams.set(search.filterState, search.query);
  url.searchParams.set("sortBy", search.sortBy);
  url.searchParams.set("page", String(search.page));
  url.searchParams.set("limit", String(SEARCH_PAGE_SIZE));
  return url.toString();
};

// DELETE must not declare a JSON content type without a body (Fastify rejects it).
export const submitBookReview = async (
  url: string,
  contribution: { rating: number | null; text: string | null } | null,
) => {
  const response = await request(
    url,
    contribution === null
      ? { method: "DELETE" }
      : {
          method: "PUT",
          headers: jsonHeaders(),
          body: JSON.stringify(contribution),
        },
  );
  return parseOwnReview(response);
};
