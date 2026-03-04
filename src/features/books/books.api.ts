import { API_ENDPOINTS } from "../../shared/config/api";
import type { BookSearchQuery } from "./types/books.types";
  
export const buildBookSearchUrl = (query: BookSearchQuery): string => {
  const params = new URLSearchParams();
  params.set(query.filterState, query.query);
  params.set("sortBy", query.sortBy);
  return `${API_ENDPOINTS.BOOKS_SEARCH}?${params.toString()}`;
};
