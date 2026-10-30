import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import { useLibrary } from "../libraryContext";
import { bookLink } from "../bookLinks";
import type { BookDetail } from "../schemas/bookDetail.schemas";
import { errorMessage } from "../../../shared/http/request";

export const BookSaveAction = ({ book }: { book: BookDetail }) => {
  const { isAuthenticated, authStatus } = useAuth();
  const library = useLibrary();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saved = library.books.some(
    (item) =>
      item.provider === book.provider &&
      item.providerBookId === book.providerBookId,
  );
  const save = async () => {
    setPending(true);
    setError(null);
    try {
      await library.save({
        provider: book.provider,
        providerBookId: book.providerBookId,
        title: book.title,
        authors: book.authors,
        thumbnail: book.thumbnail,
        canonicalVolumeLink: book.canonicalVolumeLink,
      });
    } catch (cause) {
      setError(errorMessage(cause));
      await library.refetch();
    } finally {
      setPending(false);
    }
  };
  if (authStatus === "loading") return <p>Comprobando sesión…</p>;
  if (!isAuthenticated)
    return (
      <Link
        className="button button-primary"
        to={`/login?returnTo=${encodeURIComponent(bookLink(book.provider, book.providerBookId))}`}
      >
        Inicia sesión para guardar
      </Link>
    );
  return (
    <div>
      <button
        className="button button-primary"
        disabled={pending || saved || library.loading}
        onClick={() => void (library.error ? library.refetch() : save())}
      >
        {saved
          ? "✓ En tu biblioteca"
          : pending
            ? "Guardando…"
            : library.loading
              ? "Comprobando…"
              : library.error
                ? "Comprobar biblioteca"
                : "+ Quiero leerlo"}
      </button>
      {saved && (
        <Link className="text-link" to="/mis-libros">
          Ver mi biblioteca
        </Link>
      )}
      {(error || library.error) && (
        <p className="error-message" role="alert">
          {error || library.error}
        </p>
      )}
    </div>
  );
};
