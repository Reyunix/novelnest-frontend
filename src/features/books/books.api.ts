import { API_ENDPOINTS } from "../../shared/config/api";

export const BOOKS_ENDPOINTS = {
  SEARCH: API_ENDPOINTS.BOOKS_SEARCH,
} as const;

export const buildBookSearchUrl = (query: string): string => {
  return `${BOOKS_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`;
};
