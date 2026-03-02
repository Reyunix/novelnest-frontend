const PORT = String(import.meta.env.VITE_PORT);

export const BOOKS_ENDPOINTS = {
  SEARCH: String(
    import.meta.env.VITE_API_BOOKS_SEARCH_ENDPOINT ||
      `https://127.0.0.1:${PORT}/api/v1/books/search`,
  ),
} as const;

export const buildBookSearchUrl = (query: string): string => {
  return `${BOOKS_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`;
};
