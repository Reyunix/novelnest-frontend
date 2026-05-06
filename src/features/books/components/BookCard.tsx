import { useState } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { useNotifications } from "../../notifications/notificationContext";
import { toSecureUrl } from "../../../shared/http/secureUrl";
import type { SaveStateType } from "../types/books.types";
import { BOOK_CARD_MESSAGES } from "../constants/books.constants";
import {
  parseSaveTolibraryData,
  type BooksSearchItem,
  type SaveToLibraryData,
} from "../schemas/books.schemas";
import { useSaveBook } from "../hooks/useSaveBook";

interface Props {
  bookItem: BooksSearchItem;
  provider: string;
}

export const BookCard: React.FC<Props> = ({ bookItem, provider }) => {
  const [saveState, setSaveState] = useState<SaveStateType>("idle");
  const { saveBook, loading } = useSaveBook(API_ENDPOINTS.BOOK_SAVE);
  const { showNotification } = useNotifications();
  const isSaved = saveState === "saved";
  const NOT_AVAILABLE_INFO = BOOK_CARD_MESSAGES.NOT_AVAILABLE_INFO;
  const secureThumbnail = toSecureUrl(bookItem.thumbnail);
  const secureCanonicalLink = toSecureUrl(bookItem.canonicalVolumeLink);
  console.log(bookItem.publishedDate);

  const handleclickSaveToLibrary = async () => {
    setSaveState("saving");

    const payload: SaveToLibraryData = {
      provider,
      providerBookId: bookItem.providerBookId,
      title: bookItem.title,
      authors: bookItem.authors,
      thumbnail: secureThumbnail,
      canonicalVolumeLink: secureCanonicalLink,
    };

    try {
      const parsed = parseSaveTolibraryData(payload);
      const result = await saveBook(parsed);

      if (!result.ok) {
        setSaveState("error");
        showNotification(result.error.message, "info");
        return;
      }

      setSaveState("saved");
      showNotification("Libro añadido a la colección", "success");
    } catch (error) {
      setSaveState("error");
      showNotification(
        error instanceof Error ? error.message : "Unexpected error",
        "error",
      );
    }
  };
  return (
    <article className="book-card small-section">
      {secureThumbnail ? (
        <div className="book-card-thumbnail-container">
          <img
            src={secureThumbnail}
            alt={bookItem.title || BOOK_CARD_MESSAGES.TITLE_NOT_AVAILABLE}
          />
        </div>
      ) : null}
      <div className="book-card-content">
        <div className="book-card-body">
          <h3 className="book-card-title">
            {bookItem.title || BOOK_CARD_MESSAGES.TITLE_NOT_AVAILABLE}
          </h3>
          <p>
            de{" "}
            <em>
              {bookItem.authors.length > 0
                ? bookItem.authors.join(", ")
                : NOT_AVAILABLE_INFO}
            </em>
          </p>
          <p>
            {bookItem.categories.length > 0
              ? bookItem.categories.join(", ")
              : NOT_AVAILABLE_INFO}
          </p>
          <p>Publicado {bookItem.publishedDate ?? NOT_AVAILABLE_INFO}</p>
        </div>
        <div className="book-card-actions">
          {secureCanonicalLink ? (
            <a href={secureCanonicalLink} target="_blank" rel="noreferrer">
              Ver en Google Books
            </a>
          ) : null}
          <button
            type="button"
            onClick={handleclickSaveToLibrary}
            disabled={loading || isSaved}
          >
            {(loading && <>Guardando</>) || (isSaved && <>Añadido</>) || (
              <span>Quiero leerlo</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
