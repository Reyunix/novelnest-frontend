import { type BookSearchFilter, type BookSearchQuery, type FilterOption, type SortBy, type SortOption } from "../types/books.types";

export const BOOK_SEARCH_FILTER_OPTIONS: FilterOption[] = [
  { id: "all", value: "all", literal: "Todo" },
  { id: "title", value: "title", literal: "Titulo" },
  { id: "author", value: "author", literal: "Autor" },
  { id: "subject", value: "subject", literal: "Tema" },
];

export const BOOK_SORT_OPTIONS: SortOption[] = [
  { id: "relevance", value: "relevance", literal: "Relevancia" },
  { id: "newest", value: "newest", literal: "Más recientes" },
];

export const DEFAULT_FILTER: BookSearchFilter = BOOK_SEARCH_FILTER_OPTIONS[0].value;
export const DEFAULT_SORT_BY: SortBy = BOOK_SORT_OPTIONS[0].value;

export const EMPTY_QUERY: BookSearchQuery = {
    filterState: DEFAULT_FILTER,
    query: "",
    sortBy: "relevance"
}

export const BOOK_CARD_MESSAGES = {
    TITLE_NOT_AVAILABLE: "Título no disponible",
    AUTHOR_NOT_AVAILABLE: "Título no disponible",
    NOT_AVAILABLE_INFO: "No disponible"
}

export const BOOK_STATUS_LITERAL = {
  want_to_read: "quiero leer",
  reading: "leyendo",
  completed: "completado",
  abandoned: "abandonado",
}