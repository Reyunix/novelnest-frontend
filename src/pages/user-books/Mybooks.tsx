import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { UserBooksDisplay } from "../../features/books/components/UserBooksDisplay";
import { useState } from "react";
import { BOOK_STATUS_FILTERS } from "../../features/books/constants/books.constants";
export const Mybooks = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchParams] = useSearchParams();
  const rawStatus = searchParams.get("status");
  const statusParam =
    rawStatus === "want_to_read" ||
    rawStatus === "reading" ||
    rawStatus === "completed" ||
    rawStatus === "abandoned"
      ? rawStatus
      : undefined;

  const isFilterActive = (filterId: string) => {
    return (
      rawStatus === filterId || (filterId === "all" && rawStatus === null)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedQuery = inputValue.trim();
    if (!normalizedQuery) return;

    const params = new URLSearchParams({
      filterState: "all",
      query: normalizedQuery,
      sortBy: "relevance",
    });

    navigate(`/buscar?${params.toString()}`);
    setInputValue("");
  };

  return (
    <main className="my-books-page-layout">
      <section className="my-books-filters-panel small-section">
        <div className="my-books-section-heading">
          <h2 className="my-books-section-title">Colecciones</h2>
          <p className="my-books-section-copy">
            Filtra tu estantería por estado para centrarte en lo que toca leer.
          </p>
        </div>
        <div className="my-books-filters-wrap">
          <ul className="my-books-filters-list">
            {BOOK_STATUS_FILTERS.map((filter) => (
              <li key={filter.id}>
                <NavLink
                  to={filter.href}
                  className={
                    isFilterActive(filter.id)
                      ? "my-books-filter-active"
                      : "my-books-filter"
                  }
                >
                  {filter.literal}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="my-books-page-content">
        <section className="my-books-hero">
        <div className="my-books-hero-copy">
          <p className="eyebrow">Biblioteca personal</p>
          <h1 className="my-books-page-title">Mis Libros</h1>
          <p className="my-books-page-intro">
            Consulta tu colección, cambia el estado de lectura y encuentra
            rápido nuevos títulos para añadir.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-books-search-form"
          role="search"
        >
          <input
            className="my-books-search-input"
            type="text"
            placeholder="Buscar y añadir libros"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="my-books-search-btn">
            Buscar
          </button>
        </form>
      </section>

      
      <UserBooksDisplay statusUrlParam={statusParam} />
      </div>
      
    </main>
  );
};
