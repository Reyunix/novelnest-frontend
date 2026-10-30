export type BookSearchFilter = "title" | "author" | "subject" | "all";
export type SortBy = "relevance" | "newest";

export type FilterOption = {
  id: string;
  value: BookSearchFilter;
  literal: string;
};

export type SortOption = {
  id: string;
  value: SortBy;
  literal: string;
};
