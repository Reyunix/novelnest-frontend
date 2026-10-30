export const SEARCH_PAGE_SIZE = 12;
export const readSearchQuery = (params: URLSearchParams) => {
  const filter = params.get("filterState");
  const filterState =
    filter === "title" || filter === "author" || filter === "subject"
      ? filter
      : "all";
  const sortBy = params.get("sortBy") === "newest" ? "newest" : "relevance";
  const rawPage = Number(params.get("page") ?? 1);
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  return {
    query: (params.get("query") ?? "").trim(),
    filterState,
    sortBy,
    page,
  };
};

export const searchLink = (query: string, filterState = "all") =>
  `/buscar?${new URLSearchParams({ query, filterState, sortBy: "relevance" })}`;
