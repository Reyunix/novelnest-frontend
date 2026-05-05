import { useNavigate } from "react-router-dom";
import type {
  UserBookSchemaType,
  UserBookStatus,
} from "../schemas/books.schemas";

const statusLabels: Record<UserBookStatus, string> = {
  want_to_read: "Quiero leer",
  reading: "Leyendo",
  completed: "Leído",
  abandoned: "Lo abandoné",
};
type Props = {
  userBook: UserBookSchemaType;
  userBookId: number;
  isMenuOpen: boolean;
  onSetMenuOpen: (bookId: number | null) => void;
  onDelete: (bookId: number) => Promise<unknown> | void;
  onChangeStatus: (
    userBookId: number,
    status: UserBookStatus,
  ) => Promise<unknown> | void;
};
export const BookShelfPanel = ({
  userBook,
  userBookId,
  onSetMenuOpen,
  isMenuOpen,
  onDelete,
  onChangeStatus,
}: Props) => {
  const navigate = useNavigate();
  const statusButton = (literal: string, status: UserBookStatus) => (
    <li key={status} className="status-item">
      <button
        className="userbooks-status-opt"
        onClick={() => {
          onChangeStatus(userBook.id, status);
          onSetMenuOpen(null);
        }}
      >
        {literal}
      </button>
    </li>
  );
  const handleStatusClick = (status: UserBookStatus) => {
    console.log(userBookId);
    navigate(`/mis-libros?status=${status}`);
  };
  return (
    <div className="book-status-panel" onMouseLeave={() => onSetMenuOpen(null)}>
      <button aria-label="delete-book" className="delete-book-btn" onClick={() => onDelete(userBookId)}>
      </button>
      <button
        className="status-btn"
        onClick={() => {
          handleStatusClick(userBook.status);
        }}
      >
        {statusLabels[userBook.status]}
      </button>
      <div
        className="select-book-status-container"
        onMouseEnter={() => onSetMenuOpen(userBook.id)}
      >
        <button
          className="select-book-status-btn"
          onClick={() => onSetMenuOpen(isMenuOpen ? null : userBook.id)}
        ></button>
      </div>
      <div
        className={
          isMenuOpen
            ? "status-menu-container open"
            : "status-menu-container closed"
        }
        onMouseEnter={() => onSetMenuOpen(userBook.id)}
      >
        <ul className="status-menu-list">
          {statusButton(statusLabels.want_to_read, "want_to_read")}
          {statusButton(statusLabels.reading, "reading")}
          {statusButton(statusLabels.completed, "completed")}
          {statusButton(statusLabels.abandoned, "abandoned")}
        </ul>
      </div>
    </div>
  );
};
