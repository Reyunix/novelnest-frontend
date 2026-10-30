import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import { useNotifications } from "../../notifications/notificationContext";
import { useLibrary } from "../libraryContext";
import { errorMessage } from "../../../shared/http/request";
import { AppHttpError } from "../../../shared/types/httpError.types";
import { toSecureUrl } from "../../../shared/http/secureUrl";
import type { BooksSearchItem } from "../schemas/books.schemas";
import { BookCover } from "./BookCover";
import { BookAuthors } from "./BookAuthors";
import { bookLink } from "../bookLinks";

export const BookCard = ({
  bookItem: book,
  provider,
}: {
  bookItem: BooksSearchItem;
  provider: string;
}) => {
  const [saving, setSaving] = useState(false);
  const {
    books,
    save,
    refetch,
    loading: libraryLoading,
    error: libraryError,
  } = useLibrary();
  const { authStatus, isAuthenticated } = useAuth();
  const { showNotification } = useNotifications();
  const location = useLocation();
  const saved = books.some(
    (item) =>
      item.provider === provider && item.providerBookId === book.providerBookId,
  );
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await save({
        provider,
        providerBookId: book.providerBookId,
        title: book.title,
        authors: book.authors,
        thumbnail: toSecureUrl(book.thumbnail),
        canonicalVolumeLink: toSecureUrl(book.canonicalVolumeLink),
      });
      showNotification("Libro añadido a tu biblioteca", "success");
    } catch (error) {
      if (error instanceof AppHttpError && error.status === 409)
        await refetch();
      showNotification(errorMessage(error), "error");
    } finally {
      setSaving(false);
    }
  };
  return (
    <article className="book-card">
      <BookCover src={book.thumbnail} title={book.title} />
      <div className="book-card-content">
        <div className="book-card-body">
          <p className="book-category">{book.categories[0] ?? "Libro"}</p>
          <h3 className="book-card-title">
            <Link
              to={bookLink(provider, book.providerBookId)}
              state={{
                fromSearch:
                  location.pathname === "/buscar"
                    ? location.pathname + location.search
                    : null,
              }}
            >
              {book.title}
            </Link>
          </h3>
          <p className="book-author">
            <BookAuthors authors={book.authors} />
          </p>
          {book.publishedDate && (
            <p className="book-meta">
              Publicado en {book.publishedDate.slice(0, 4)}
            </p>
          )}
        </div>
        <div className="book-card-actions">
          {isAuthenticated ? (
            <button
              className={
                saved ? "button button-saved" : "button button-primary"
              }
              disabled={saving || saved || libraryLoading}
              onClick={() => {
                if (libraryError) {
                  void refetch();
                } else {
                  void handleSave();
                }
              }}
            >
              {saved
                ? "✓ En tu biblioteca"
                : saving
                  ? "Guardando…"
                  : libraryLoading
                    ? "Comprobando…"
                    : libraryError
                      ? "Comprobar biblioteca"
                      : "+ Quiero leerlo"}
            </button>
          ) : authStatus === "loading" ? (
            <span>Comprobando sesión…</span>
          ) : (
            <Link
              className="button button-primary"
              to={`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`}
            >
              Inicia sesión para guardar
            </Link>
          )}
          {book.canonicalVolumeLink && (
            <a
              className="text-link"
              href={toSecureUrl(book.canonicalVolumeLink) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Books <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
