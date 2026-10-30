import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserBooksDisplay } from "../../features/books/components/UserBooksDisplay";
import { BOOK_STATUS_FILTERS } from "../../features/books/constants/books.constants";
import { useLibrary } from "../../features/books/libraryContext";

const LibrarySearch = ({
  query,
  onSearch,
}: {
  query: string;
  onSearch: (query: string) => void;
}) => {
  const [draft, setDraft] = useState(query);
  return (
    <form
      className="library-search-form"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(draft.trim());
      }}
    >
      <label className="library-search">
        <span className="field-label">Buscar en tu biblioteca</span>
        <input
          type="search"
          placeholder="Título o autor de tus libros"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      </label>
      <button className="button button-secondary" type="submit">
        Filtrar
      </button>
    </form>
  );
};

export const Mybooks = () => {
  const [params, setParams] = useSearchParams();
  const { books, loading, refetch } = useLibrary();
  const rawStatus = params.get("status");
  const status =
    rawStatus === "want_to_read" ||
    rawStatus === "reading" ||
    rawStatus === "completed" ||
    rawStatus === "abandoned"
      ? rawStatus
      : undefined;
  const query = params.get("q") ?? "";
  const sort = params.get("sort") === "title" ? "title" : "recent";
  const setFilter = (name: string, value: string, replace = false) => {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next, { replace });
  };
  return (
    <div className="page-shell library-page">
      <header className="page-heading heading-with-action">
        <div>
          <p className="eyebrow">Tu espacio de lectura</p>
          <h1>Mi biblioteca</h1>
          <p>Los libros que te esperan, te acompañan y se quedan contigo.</p>
        </div>
        <div className="inline-actions heading-actions">
          <button className="button button-secondary" disabled={loading} onClick={() => void refetch()}>{loading ? "Actualizando…" : "Actualizar"}</button>
          <Link className="button button-primary" to="/buscar">+ Añadir libros</Link>
        </div>
      </header>
      <section
        className="library-toolbar surface"
        aria-label="Filtros de la biblioteca"
      >
        <div className="library-summary">
          <span>
            <strong>{books.length}</strong> en tu biblioteca
          </span>
          <span>
            <strong>
              {books.filter((book) => book.status === "reading").length}
            </strong>{" "}
            leyendo
          </span>
          <span>
            <strong>
              {books.filter((book) => book.status === "completed").length}
            </strong>{" "}
            leídos
          </span>
        </div>
        <div
          className="library-filters"
          role="group"
          aria-label="Estado de lectura"
        >
          {BOOK_STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              className="filter-chip"
              aria-pressed={filter.id === (status ?? "all")}
              onClick={() =>
                setFilter("status", filter.id === "all" ? "" : filter.id)
              }
            >
              {filter.literal}
              <span>
                {
                  books.filter(
                    (book) => filter.id === "all" || book.status === filter.id,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="library-search-row">
          <LibrarySearch
            key={query}
            query={query}
            onSearch={(query) => setFilter("q", query)}
          />
          <label className="sort-field">
            Ordenar por
            <select
              value={sort}
              onChange={(event) => setFilter("sort", event.target.value)}
            >
              <option value="recent">Añadidos recientemente</option>
              <option value="title">Título, de A a Z</option>
            </select>
          </label>
        </div>
      </section>
      <UserBooksDisplay statusUrlParam={status} query={query} sort={sort} />
    </div>
  );
};
