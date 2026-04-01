import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { UserBooksDisplay } from "../../features/books/components/UserBooksDisplay";
import { useState } from "react";
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
    <div className="my-books-page-layout">
      <span className="my-books-page-header">
        <h1 className="my-books-page-title">Mis Libros</h1>{" "}
        <form
          action=""
          onSubmit={handleSubmit}
          className="my-books-search-form"
        >
          <input
            type="text"
            placeholder="Buscar y añadir libros"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div></div>
      </span>
      <section>
        <h2>Colecciones</h2>
        <div>
          <ul>
            <li>
              <NavLink to="/mis-libros">Todos</NavLink>
            </li>
            <li>
              <NavLink to="/mis-libros?status=want_to_read">
                Quiero leer
              </NavLink>
            </li>
            <li>
              <NavLink to="/mis-libros?status=reading">Leyendo</NavLink>
            </li>
            <li>
              <NavLink to="/mis-libros?status=completed">Completados</NavLink>
            </li>
            <li>
              <NavLink to="/mis-libros?status=abandoned">Abandonados</NavLink>
            </li>
          </ul>
        </div>
      </section>
      <UserBooksDisplay statusUrlParam={statusParam} />
    </div>
  );
};
