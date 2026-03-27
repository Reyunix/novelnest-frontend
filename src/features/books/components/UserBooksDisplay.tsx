import { useState } from "react";
import { useDeleteUserBook } from "../hooks/useDeleteUserBook";
import { useGetUserBooks } from "../hooks/useGetUserBooks";
import { BookDisplay } from "./BookDisplay";
import { useNotifications } from "../../notifications/notificationContext";
import type {
  UserBookSchemaType,
  UserBookStatus,
} from "../schemas/books.schemas";
import { useUpdateUserBookStatus } from "../hooks/useUpdateUserBookStatus";
import { BOOK_STATUS_LITERAL } from "../constants/books.constants";

const countBooks = (books: UserBookSchemaType[], status: UserBookStatus) => {
  return books.filter((book) => book.status === status).length;
};
export const UserBooksDisplay = () => {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const {
    loading: booksLading,
    data,
    error: booksError,
    refetch,
  } = useGetUserBooks();
  const { deleteBook } = useDeleteUserBook();
  const { updateUserBookStatus } = useUpdateUserBookStatus();
  const visibleBooks =
    data?.filter((book) => !deletedIds.includes(book.id)) ?? [];

  const booksPendingCount = countBooks(visibleBooks, "want_to_read");
  const booksReadingCount = countBooks(visibleBooks, "reading");
  const booksCompletedCount = countBooks(visibleBooks, "completed");
  const booksAbandonedCount = countBooks(visibleBooks, "abandoned");

  const { showNotification } = useNotifications();

  const handleDelete = async (bookId: number) => {
    const response = await deleteBook(bookId);
    if (!response?.ok) {
      showNotification("No se pudo eliminar el libro correctamente", "error");
      return;
    }
    setDeletedIds((prev) => [...prev, bookId]);
    showNotification("Libro eliminado correctamente", "success");
  };

  const handleUpdateStatus = async (bookId: number, status: UserBookStatus) => {
    const response = await updateUserBookStatus(bookId, status);
    if (!response) {
      showNotification("No se pudo eliminar el libro correctamente", "error");
      return;
    }
    await refetch();
    showNotification(`Estado actualizado a ${BOOK_STATUS_LITERAL[status]}`, "success")
  };

  return (
    <section className="userbooks-collection">
      {booksLading ? (
        <span>Cargando...</span>
      ) : booksError ? (
        <span>{booksError}</span>
      ) : visibleBooks && visibleBooks.length > 0 ? (
        <>
          <h3>Pendientes de lectura ({booksPendingCount})</h3>
          {visibleBooks
            .filter((book) => book.status === "want_to_read")
            .map((filtered) => {
              return (
                <BookDisplay
                  key={filtered.id}
                  userBook={filtered}
                  onDelete={handleDelete}
                  onChangeStatus={handleUpdateStatus}
                />
              );
            })}
          <h3>Leyendo ({booksReadingCount})</h3>
          {visibleBooks
            .filter((book) => book.status === "reading")
            .map((filtered) => {
              return (
                <BookDisplay
                  key={filtered.id}
                  userBook={filtered}
                  onDelete={handleDelete}
                  onChangeStatus={handleUpdateStatus}
                />
              );
            })}
          <h3>Completados ({booksCompletedCount})</h3>
          {visibleBooks
            .filter((book) => book.status === "completed")
            .map((filtered) => {
              return (
                <BookDisplay
                  key={filtered.id}
                  userBook={filtered}
                  onDelete={handleDelete}
                  onChangeStatus={handleUpdateStatus}
                />
              );
            })}
          <h3>Abandonados ({booksAbandonedCount})</h3>
          {visibleBooks
            .filter((book) => book.status === "abandoned")
            .map((filtered) => {
              return (
                <BookDisplay
                  key={filtered.id}
                  userBook={filtered}
                  onDelete={handleDelete}
                  onChangeStatus={handleUpdateStatus}
                />
              );
            })}
        </>
      ) : (
        <span>
          No has guardado todavía ningún libro. Comienza tu colección buscando
          en la barra de búsqueda.
        </span>
      )}
    </section>
  );
};
