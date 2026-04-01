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

const countBooks = (books: UserBookSchemaType[], status?: UserBookStatus) => {
  if (!status) return books.length;
  return books.filter((book) => book.status === status).length;
};
export const UserBooksDisplay = ({
  statusUrlParam,
}: {
  statusUrlParam?: UserBookStatus;
}) => {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const {
    loading: booksLoading,
    data,
    error: booksError,
    refetch,
  } = useGetUserBooks(statusUrlParam);
  const { showNotification } = useNotifications();
  const { deleteBook } = useDeleteUserBook();
  const { updateUserBookStatus } = useUpdateUserBookStatus();

  const visibleBooks =
    data?.filter((book) => !deletedIds.includes(book.id)) ?? [];

  const booksPendingCount = countBooks(visibleBooks, statusUrlParam);
  const bookStatusLabel = statusUrlParam
    ? `${BOOK_STATUS_LITERAL[statusUrlParam].toUpperCase()} (${booksPendingCount}) `
    : `TODOS (${booksPendingCount})`;

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
    showNotification(
      `Estado actualizado a ${BOOK_STATUS_LITERAL[status]}`,
      "success",
    );
  };

  return (
    <section className="userbooks-collection">
      {booksLoading ? (
        <span>Cargando...</span>
      ) : booksError ? (
        <span>{booksError}</span>
      ) : visibleBooks && visibleBooks.length > 0 ? (
        <>
          <h3>{bookStatusLabel}</h3>
          {visibleBooks
            .map((book) => {
              return (
                <BookDisplay
                  key={book.id}
                  userBook={book}
                  onDelete={handleDelete}
                  onChangeStatus={handleUpdateStatus}
                />
              );
            })}
        </>
      ) : (
        <span>
          Colección vacía. Comienza tu colección buscando
          en la barra de búsqueda.
        </span>
      )}
    </section>
  );
};
