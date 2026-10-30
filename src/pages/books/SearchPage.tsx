import { useDemo } from "../../features/demo/demoContext";
import { DemoCatalog } from "../../features/demo/DemoCatalog";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookCard } from "../../features/books/components/BookCard";
import { SearchFilterGroup } from "../../features/books/components/SearchFilterGroup";
import {
  BOOK_SEARCH_FILTER_OPTIONS,
  BOOK_SORT_OPTIONS,
} from "../../features/books/constants/books.constants";
import { useBookSearch } from "../../features/books/hooks/useBookSearch";
import {
  readSearchQuery,
  SEARCH_PAGE_SIZE,
  searchLink,
} from "../../features/books/searchQuery";
import { FeedbackState } from "../../components/FeedbackState";

type SearchValues = ReturnType<typeof readSearchQuery>;
const SearchForm = ({
  initial,
  onSubmit,
}: {
  initial: SearchValues;
  onSubmit: (values: SearchValues) => void;
}) => {
  const [values, setValues] = useState(initial);
  return (
    <form
      className="search-form surface"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ ...values, query: values.query.trim(), page: 1 });
      }}
    >
      <label className="field-label" htmlFor="book-query">
        Título, autor o tema
      </label>
      <div className="search-input-row">
        <input
          id="book-query"
          name="query"
          type="search"
          placeholder="¿Qué te apetece leer?"
          value={values.query}
          required
          maxLength={120}
          onChange={(event) =>
            setValues({ ...values, query: event.target.value })
          }
        />
        <button className="button button-primary" type="submit">
          Buscar libros <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="search-options">
        <fieldset>
          <legend>Buscar por</legend>
          <SearchFilterGroup
            name="searchBy"
            value={values.filterState}
            options={BOOK_SEARCH_FILTER_OPTIONS}
            onChange={(filterState) => setValues({ ...values, filterState })}
          />
        </fieldset>
        <label className="sort-field">
          Ordenar por
          <select
            value={values.sortBy}
            onChange={(event) =>
              setValues({
                ...values,
                sortBy:
                  event.target.value === "newest" ? "newest" : "relevance",
              })
            }
          >
            {BOOK_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.literal}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};

export const SearchPage = () => {
  const { active: demo } = useDemo();
  const [params, setParams] = useSearchParams();
  const applied = readSearchQuery(params);
  const { data, loading, error, refetch } = useBookSearch(params);
  const result = data?.data;
  const submit = (values: SearchValues) => {
    if (!values.query) return;
    setParams({
      query: values.query,
      filterState: values.filterState,
      sortBy: values.sortBy,
      page: String(values.page),
    });
    if (JSON.stringify(applied) === JSON.stringify(values)) void refetch();
  };
  const changePage = (page: number) => {
    submit({ ...applied, page });
    document
      .getElementById("search-results")
      ?.scrollIntoView({ block: "start" });
  };
  // Google Books totals are estimates. A short page is the reliable end signal.
  const hasNext = Boolean(
    result && result.items.length === SEARCH_PAGE_SIZE && applied.page < 50,
  );
  return (
    <div className="page-shell search-page">
      <header className="page-heading">
        <p className="eyebrow">Descubre tu próxima lectura</p>
        <h1>Una historia te espera.</h1>
        <p>Explora el catálogo y guarda los libros que quieres tener cerca.</p>
      </header>
      <SearchForm
        key={`${applied.query}:${applied.filterState}:${applied.sortBy}:${applied.page}`}
        initial={applied}
        onSubmit={submit}
      />
      {demo && !applied.query && <DemoCatalog />}
      <section
        id="search-results"
        aria-label="Resultados de búsqueda"
        aria-busy={loading}
        className="results-section"
      >
        {loading ? (
          <FeedbackState title="Buscando entre historias…">
            <p>Estamos consultando el catálogo.</p>
          </FeedbackState>
        ) : error ? (
          <FeedbackState title="No hemos podido cargar los libros" error>
            <p>{error}</p>
            <button
              className="button button-secondary"
              onClick={() => void refetch()}
            >
              Reintentar búsqueda
            </button>
          </FeedbackState>
        ) : result && result.items.length > 0 ? (
          <>
            <div className="results-heading">
              <h2>Resultados para «{applied.query}»</h2>
              <span role="status">
                {result.items.length} libros · Página {applied.page}
              </span>
            </div>
            <div className="book-grid">
              {result.items.map((book) => (
                <BookCard
                  key={`${result.provider}:${book.providerBookId}`}
                  bookItem={book}
                  provider={result.provider}
                />
              ))}
            </div>
          </>
        ) : applied.query ? (
          <FeedbackState title="No encontramos libros en esta página">
            <p>
              Prueba con otro título, autor o tema
              {applied.page > 1 ? ", o vuelve a la página anterior" : ""}.
            </p>
          </FeedbackState>
        ) : (
          <div className="discovery-state surface">
            <span className="eyebrow">Empieza por una idea</span>
            <h2>Un autor pendiente. Un género favorito.</h2>
            <p>No hace falta saber el título. Prueba una de estas búsquedas.</p>
            <div className="suggestion-links">
              {["Ciencia ficción", "Misterio", "Literatura española"].map(
                (query) => (
                  <Link key={query} to={searchLink(query, "subject")}>
                    {query} ↗
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
        {!loading && !error && result && (applied.page > 1 || hasNext) && (
          <nav className="pagination" aria-label="Paginación de resultados">
            <button
              className="button button-secondary"
              disabled={applied.page <= 1}
              onClick={() => changePage(applied.page - 1)}
            >
              ← Anterior
            </button>
            <span aria-current="page">Página {applied.page}</span>
            <button
              className="button button-secondary"
              disabled={!hasNext}
              onClick={() => changePage(applied.page + 1)}
            >
              Siguiente →
            </button>
          </nav>
        )}
        {result && result.items.length > 0 && (
          <p className="catalog-credit">
            Información y disponibilidad de portadas proporcionadas por Google
            Books.
          </p>
        )}
      </section>
      {demo && applied.query && <DemoCatalog />}
    </div>
  );
};
