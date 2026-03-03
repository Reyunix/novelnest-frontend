import { API_ENDPOINTS } from "../../shared/config/api";
import type { BookSearchQuery } from "../../types/interfaces";
  
export const buildBookSearchUrl = (query: BookSearchQuery): string => {
  const params = new URLSearchParams();
  params.set(query.filterState, query.query);
  return `${API_ENDPOINTS.BOOKS_SEARCH}?${params.toString()}`;
};
