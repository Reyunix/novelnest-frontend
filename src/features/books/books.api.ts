import { API_ENDPOINTS } from "../../shared/config/config.api";
import { BookSearchQuerySchema } from "./schemas/books.schemas";

export const buildBookSearchUrl = (queryParams: URLSearchParams): string => {
  const rawQuery = queryParams.get("query");
  if (!rawQuery || !rawQuery.trim()) {
    return "";
  }

  const rawData = Object.fromEntries(queryParams.entries());
  const parsed = BookSearchQuerySchema.safeParse(rawData);

  if (!parsed.success) {
    console.error(
      "Error al construir la URL de búsqueda de libros:",
      parsed.error,
    );
    return "";
  }

  const { filterState, query: searchTerm, sortBy } = parsed.data;

  const url = new URL(API_ENDPOINTS.BOOKS_SEARCH);
  url.searchParams.append(filterState, searchTerm);
  url.searchParams.append("sortBy", sortBy);

  return url.toString();
};
