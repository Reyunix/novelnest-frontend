import type {
  UserBookSchemaType,
  UserBookStatus,
} from "../schemas/books.schemas";
import { BookShelfPanel } from "./BookShelfPanel";

type Props = {
  userBook: UserBookSchemaType;
  isMenuOpen: boolean;
  onSetMenuOpen: (bookId: number | null) => void;
  onDelete: (bookId: number) => Promise<unknown> | void;
  onChangeStatus: (
    bookId: number,
    status: UserBookStatus,
  ) => Promise<unknown> | void;
};
export const BookDisplay: React.FC<Props> = ({
  userBook,
  isMenuOpen,
  onSetMenuOpen,
  onDelete,
  onChangeStatus,
}) => {
  return (
    <article
      className={
        isMenuOpen ? "book-details book-details--menu-open" : "book-details"
      }
    >
      {userBook.thumbnail && (
        <div className="thumbnail-container">
          <img
            className="book-details-thumbnail"
            src={userBook.thumbnail}
            alt=""
          />
        </div>
      )}
      <div className="book-details-content">
        <div className="book-details-texts">
        <h3 className="book-details-title">
          <a
          href={
            userBook.canonicalVolumeLink ? userBook.canonicalVolumeLink : ""
          }
          target="_blank"
          rel="noopener noreferrer"
        >
         {userBook.title}
        </a>
        </h3>
        <p>Añadido: {userBook.createdAt}</p>
        <p>Por: <em>{userBook.authors.join(", ")}</em></p>
      </div>
      <BookShelfPanel
        onChangeStatus={onChangeStatus}
        onSetMenuOpen={onSetMenuOpen}
        userBookId={userBook.id}
        userBook={userBook}
        isMenuOpen={isMenuOpen}
        onDelete={onDelete}
      />
      </div>
    </article>
  );
};
