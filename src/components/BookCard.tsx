import type { BooksSearchItem } from "../schemas/apiResponseSchema";

interface Props {
  bookItem: BooksSearchItem;
}

export const BookCard: React.FC<Props> = ({ bookItem }) => {
  const toSecureUrl = (url?: string | null) =>
    url?.startsWith("http:") ? url.replace(/^http:/, "https:") : url;

  const NOT_AVAILABLE_INFO = "no disponible";
  const secureThumbnail = toSecureUrl(bookItem.thumbnail);
  const secureCanonicalLink = toSecureUrl(bookItem.canonicalVolumeLink);

  return (
    <div className="book-card">
      <h3>{bookItem.title || "Título no disponible"}</h3>
      <p>
        Autores:{" "}
        {bookItem.authors.length > 0
          ? bookItem.authors.join(", ")
          : NOT_AVAILABLE_INFO}
      </p>
      {secureThumbnail ? <img src={secureThumbnail} alt={bookItem.title} /> : null}
      <p>
        Categorías:{" "}
        {bookItem.categories.length > 0
          ? bookItem.categories.join(", ")
          : NOT_AVAILABLE_INFO}
      </p>
      <p>Editorial: {bookItem.publisher ?? NOT_AVAILABLE_INFO}</p>
      <p>Fecha de publicación: {bookItem.publishedDate ?? NOT_AVAILABLE_INFO}</p>
      <p>Páginas: {bookItem.pageCount ?? NOT_AVAILABLE_INFO}</p>
      {secureCanonicalLink ? (
        <a href={secureCanonicalLink} target="_blank" rel="noreferrer">
          Ver en Google Books
        </a>
      ) : null}
    </div>
  );
};
