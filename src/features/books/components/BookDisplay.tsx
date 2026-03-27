import type {
  UserBookSchemaType,
  UserBookStatus,
} from "../schemas/books.schemas";

const statusLabels: Record<UserBookStatus, string> = {
  want_to_read: "Quiero leer",
  reading: "Actualmente leyendo",
  completed: "Leído",
  abandoned: "Lo abandoné",
};

type Props = {
  userBook: UserBookSchemaType;
  onDelete: (bookId: number) => Promise<unknown> | void;
  onChangeStatus: (
    bookId: number,
    status: UserBookStatus,
  ) => Promise<unknown> | void;
};
export const BookDisplay: React.FC<Props> = ({ userBook, onDelete, onChangeStatus }) => {
  return (
    <div className="book-details">
      {userBook.thumbnail && (
        <img
          className="book-details-thumbnail"
          src={userBook.thumbnail}
          alt=""
        />
      )}
      <div className="book-details-texts">
        <a
          href={
            userBook.canonicalVolumeLink ? userBook.canonicalVolumeLink : ""
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="book-details-title">{userBook.title}</p>
        </a>
        <p>Añadido: {userBook.createdAt}</p>
        <p>{statusLabels[userBook.status]}</p>
      </div>
      <div className="book-details-panel">
        <button
          type="button"
          className="start-book-button"
          onClick={() => onChangeStatus(userBook.id, "reading")}
        >
          Empezar
        </button>
        <button
          type="button"
          className="complete-book-button"
          onClick={() => onChangeStatus(userBook.id, "completed")}
        >
          Completar
        </button>
        <button
          type="button"
          className="drop-book-button"
          onClick={() => onChangeStatus(userBook.id, "abandoned")}
        >
          Abandonar
        </button>
        <button
          type="button"
          className="drop-book-button"
          onClick={() => onChangeStatus(userBook.id, "want_to_read")}
        >
          Quiero leer
        </button>
        <button
          type="button"
          className="delete-book-button"
          onClick={() => onDelete(userBook.id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
