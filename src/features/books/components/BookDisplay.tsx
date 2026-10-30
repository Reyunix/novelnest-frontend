import { useState } from "react";
import { Link } from "react-router-dom";
import { BookShelfPanel } from "./BookShelfPanel";
import { BookCover } from "./BookCover";
import { useLibrary } from "../libraryContext";
import { useNotifications } from "../../notifications/notificationContext";
import { errorMessage } from "../../../shared/http/request";
import type {
  UserBookSchemaType,
  UserBookStatus,
} from "../schemas/books.schemas";
import { bookLink } from "../bookLinks";
import { BookAuthors } from "./BookAuthors";
import { toSecureUrl } from "../../../shared/http/secureUrl";

export const BookDisplay = ({
  userBook: book,
}: {
  userBook: UserBookSchemaType;
}) => {
  const { changeStatus, remove } = useLibrary();
  const { showNotification } = useNotifications();
  const [pending, setPending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateStatus = async (status: UserBookStatus) => {
    setPending(true);
    setError(null);
    try {
      await changeStatus(book.id, status);
      showNotification("Estado de lectura actualizado", "success");
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setPending(false);
    }
  };
  const deleteBook = async () => {
    setPending(true);
    setError(null);
    try {
      await remove(book.id);
      showNotification("Libro eliminado de tu biblioteca", "success");
    } catch (cause) {
      setError(errorMessage(cause));
      setPending(false);
    }
  };
  return (
    <article className="book-card library-book" aria-busy={pending}>
      <BookCover src={book.thumbnail} title={book.title} />
      <div className="book-card-content">
        <div className="book-card-body">
          <h3>
            <Link to={bookLink(book.provider, book.providerBookId)}>
              {book.title}
            </Link>
          </h3>
          <p className="book-author">
            <BookAuthors authors={book.authors} />
          </p>
          <p className="book-meta">
            Añadido el{" "}
            {new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(
              new Date(book.createdAt),
            )}
          </p>
        </div>
        <div className="library-book-actions">
          <BookShelfPanel
            id={book.id}
            title={book.title}
            status={book.status}
            pending={pending}
            onChange={(status) => void updateStatus(status)}
          />
          {book.canonicalVolumeLink && (
            <a
              className="text-link"
              href={toSecureUrl(book.canonicalVolumeLink) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver libro ↗
            </a>
          )}
          <button
            className="text-button danger-text"
            disabled={pending}
            onClick={() => setConfirmDelete(true)}
            aria-label={`Eliminar ${book.title}`}
          >
            Eliminar
          </button>
        </div>
        {confirmDelete && (
          <div className="delete-confirmation">
            <p>¿Eliminar «{book.title}» de tu biblioteca?</p>
            <div className="inline-actions">
              <button
                className="button button-danger"
                disabled={pending}
                onClick={() => void deleteBook()}
              >
                {pending ? "Eliminando…" : "Sí, eliminar"}
              </button>
              <button
                className="button button-secondary"
                disabled={pending}
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
};
