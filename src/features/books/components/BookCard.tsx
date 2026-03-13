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
        showNotification(result.error.message, "error");
        return;
      }

      setSaveState("saved");
      showNotification("Book saved to your library", "success");
    } catch (error) {
      setSaveState("error");
      showNotification(
        error instanceof Error ? error.message : "Unexpected error",
        "error",
      );
    }
  };
  return (
    <div className="book-card">
      <h3>{bookItem.title || BOOK_CARD_MESSAGES.TITLE_NOT_AVAILABLE}</h3>
      <p>
        Autores:{" "}
        {bookItem.authors.length > 0
          ? bookItem.authors.join(", ")
          : NOT_AVAILABLE_INFO}
      </p>
      {secureThumbnail ? (
        <img src={secureThumbnail} alt={bookItem.title} />
      ) : null}
      <p>
        Categorías:{" "}
        {bookItem.categories.length > 0
          ? bookItem.categories.join(", ")
          : NOT_AVAILABLE_INFO}
      </p>
      <p>Editorial: {bookItem.publisher ?? NOT_AVAILABLE_INFO}</p>
      <p>
        Fecha de publicación: {bookItem.publishedDate ?? NOT_AVAILABLE_INFO}
      </p>
      <p>Páginas: {bookItem.pageCount ?? NOT_AVAILABLE_INFO}</p>
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
          <>Guardar en mi biblioteca</>
        )}
      </button>
    </div>
  );
};
