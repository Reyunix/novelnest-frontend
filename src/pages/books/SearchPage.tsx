import { useState } from "react";
import { BookCard } from "../../features/books/components/BookCard";
import { useBookSearch } from "../../features/books/hooks/useBookSearch";
import {
  BOOK_SEARCH_FILTER_OPTIONS,
  BOOK_SORT_OPTIONS,
  DEFAULT_FILTER,
  DEFAULT_SORT_BY,
  EMPTY_QUERY,
} from "../../features/books/constants/books.constants";
import { SearchFilterGroup } from "../../features/books/components/SearchFilterGroup";
import type {
  BookSearchFilter,
  BookSearchQuery,
  SortBy,
} from "../../features/books/types/books.types";

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] =
    useState<BookSearchFilter>(DEFAULT_FILTER);
  const [submittedQuery, setSubmittedQuery] =
    useState<BookSearchQuery>(EMPTY_QUERY);
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT_BY);

  const { data, loading, error } = useBookSearch(submittedQuery);
  const booksData = data?.data;

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const querySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = inputValue.trim();
    setInputValue(normalizedQuery);
    if (!normalizedQuery) return;

    setSubmittedQuery({
      filterState,
      query: normalizedQuery,
      sortBy,
    });
  };

  return (
    <div className="search-page-layout">
      <form action="" onSubmit={querySubmit} className="search-form">
        <fieldset className="search-fieldset">
          <div>
            <input
              placeholder="Busca por título, autor o tema"
              value={inputValue}
              type="text"
              className="search-bar"
              onChange={(event) => {
                handleQueryInput(event);
              }}
            />
          </div>
          <SearchFilterGroup
            name="searchBy"
            value={filterState}
            onChange={setFilterState}
            options={BOOK_SEARCH_FILTER_OPTIONS}
          />
          <SearchFilterGroup
            name="sortBy"
            value={sortBy}
            onChange={setSortBy}
            options={BOOK_SORT_OPTIONS}
          />
        </fieldset>
      </form>

      <section className="grid-layout">
        {loading ? (
          <span className="centered-self">Cargando...</span>
        ) : error ? (
          <span>Error en el servidor, disculpe las molestias.</span>
        ) : booksData ? (
          booksData.items.length > 0 ? (
            booksData.items.map((bookItem) => {
              return <BookCard key={bookItem.providerBookId} bookItem={bookItem} provider={booksData.provider} />;
            })
          ) : (
            <span className="centered-self">
              No se han encontrado resultados para su busqueda.
            </span>
          )
        ) : (
          <span className="centered-self">
            Ingrese el titulo de un libro y presione Enter para buscar.
          </span>
        )}
      </section>
    </div>
  );
};
