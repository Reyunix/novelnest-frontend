import { Link } from "react-router-dom";
import { BookDisplay } from "./BookDisplay";
import { useLibrary } from "../libraryContext";
import type { UserBookStatus } from "../schemas/books.schemas";
import { FeedbackState } from "../../../components/FeedbackState";

export const UserBooksDisplay = ({
  statusUrlParam,
  query = "",
  sort = "recent",
}: {
  statusUrlParam?: UserBookStatus;
  query?: string;
  sort?: string;
}) => {
  const { books, loading, error, refetch } = useLibrary();
  if (loading && !books.length)
    return <FeedbackState title="Abriendo tu biblioteca…" />;
  if (error)
    return (
      <FeedbackState title="No hemos podido cargar tu biblioteca" error>
        <p>{error}</p>
        <button
          className="button button-secondary"
          onClick={() => void refetch()}
        >
          Reintentar
        </button>
      </FeedbackState>
    );
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const visible = books
    .filter(
      (book) =>
        (!statusUrlParam || book.status === statusUrlParam) &&
        `${book.title} ${book.authors.join(" ")}`
          .toLocaleLowerCase("es")
          .includes(normalizedQuery),
    )
    .sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title, "es")
        : Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
  if (!visible.length)
    return (
      <FeedbackState
        title={
          !books.length
            ? "Tu biblioteca empieza aquí"
            : "No hay libros con estos filtros"
        }
      >
        <p>
          {!books.length
            ? "Encuentra tu próxima lectura y guárdala para volver a ella cuando quieras."
            : "Prueba otro estado o cambia la búsqueda. Tus demás libros siguen en tu biblioteca."}
        </p>
        <Link
          className="button button-primary"
          to={!books.length ? "/buscar" : "/mis-libros"}
        >
          {!books.length ? "Explorar libros" : "Ver toda mi biblioteca"}
        </Link>
      </FeedbackState>
    );
  return (
    <section aria-label="Libros de tu biblioteca" aria-busy={loading}>
      <p className="collection-count" role="status">
        {visible.length} {visible.length === 1 ? "libro" : "libros"}
        {query ? ` para «${query}»` : " en esta vista"}
      </p>
      <div className="collection-grid">
        {visible.map((book) => (
          <BookDisplay key={book.id} userBook={book} />
        ))}
      </div>
    </section>
  );
};
