import { useState } from "react";
import { API_ENDPOINTS } from "../../../shared/config/config.api";
import { parseApiError, postJson } from "../../../shared/http/postJson";
import { toSecureUrl } from "../../../shared/http/secureUrl";
import type { SaveStateType } from "../types/books.types";
import { BOOK_CARD_MESSAGES } from "../constants/books.constants";
import {
  parseSaveTolibraryData,
  type BooksSearchItem,
  type SaveToLibraryData,
} from "../schemas/books.schemas";

interface Props {
  bookItem: BooksSearchItem;
  provider: string;
}

export const BookCard: React.FC<Props> = ({ bookItem, provider }) => {
  const [saveState, setSaveState] = useState<SaveStateType>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const isSaving = saveState === "saving";
  const isSaved = saveState === "saved";
  const NOT_AVAILABLE_INFO = BOOK_CARD_MESSAGES.NOT_AVAILABLE_INFO;
  const secureThumbnail = toSecureUrl(bookItem.thumbnail);
  const secureCanonicalLink = toSecureUrl(bookItem.canonicalVolumeLink);

  const handleclickSaveToLibrary = async () => {
    setSaveState("saving");
    setSaveError(null);

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
      const res = await postJson(API_ENDPOINTS.BOOK_SAVE, parsed);
      if (!res.ok) {
        const apiErr = await parseApiError(res);
        throw new Error(apiErr?.message ?? `Request failed (${res.status})`);
      }
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Error inesperado");
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
        disabled={isSaving || isSaved}
      >
        {(isSaving && <>Guardando</>) || (isSaved && <>Añadido</>) || (
          <>Guardar en mi biblioteca</>
        )}
      </button>
      {saveError && <p className="error-message">{saveError}</p>}
    </div>
  );
};
