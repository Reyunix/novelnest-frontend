import { useState } from "react";
import { BookCard } from "../../components/BookCard";
import { useBookSearch } from "../../features/books/hooks/useBookSearch";
import type { BookSearchQuery, FilterState } from "../../types/interfaces";

const FILTER_OPTIONS = {
  TITLE: "title",
  AUTHOR: "author",
  SUBJECT: "subject",
  ALL: "q",
} as const;

const EMPTY_QUERY: BookSearchQuery = { filterState: FILTER_OPTIONS.ALL, query: "" };

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState<FilterState>(FILTER_OPTIONS.ALL);
  const [submittedQuery, setSubmittedQuery] = useState<BookSearchQuery>(EMPTY_QUERY);
  const normalizedQuery = inputValue.trim();

  const { data, loading, error } = useBookSearch(submittedQuery);

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const querySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizedQuery) return;

    const queryWithFilter: BookSearchQuery = {
      filterState,
      query: normalizedQuery,
    };

    setInputValue(normalizedQuery);
    setSubmittedQuery(queryWithFilter);
  };

  return (
    <div className="search-page-layout">
      <form action="" onSubmit={querySubmit} className="search-form">
        <fieldset>
          <input
            value={inputValue}
            type="text"
            className="search-bar"
            onChange={(event) => {
              handleQueryInput(event);
            }}
          />
          <input
            type="radio"
            name="searchBy"
            value="all"
            id="all"
            checked={filterState === FILTER_OPTIONS.ALL}
            onChange={() => {
              setFilterState(FILTER_OPTIONS.ALL);
            }}
          />
          <label htmlFor="all">Todo</label>
          <input
            type="radio"
            name="searchBy"
            value="title"
            id="title"
            checked={filterState === FILTER_OPTIONS.TITLE}
            onChange={() => {
              setFilterState(FILTER_OPTIONS.TITLE);
            }}
          />
          <label htmlFor="title">Titulo</label>
          <input
            type="radio"
            name="searchBy"
            value="author"
            id="author"
            checked={filterState === FILTER_OPTIONS.AUTHOR}
            onChange={() => {
              setFilterState(FILTER_OPTIONS.AUTHOR);
            }}
          />
          <label htmlFor="author">Autor</label>
          <input
            type="radio"
            name="searchBy"
            value="subject"
            id="subject"
            checked={filterState === FILTER_OPTIONS.SUBJECT}
            onChange={() => {
              setFilterState(FILTER_OPTIONS.SUBJECT);
            }}
          />
          <label htmlFor="subject">Tema</label>
        </fieldset>
      </form>

      <section className="grid-layout">
        {loading ? (
          <span className="centered-self">Cargando...</span>
        ) : error ? (
          <span>Error en el servidor, disculpe las molestias.</span>
        ) : data ? (
          data.items && data.items.length > 0 ? (
            data.items.map((bookItem) => {
              return <BookCard key={bookItem.id} bookItem={bookItem} />;
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
