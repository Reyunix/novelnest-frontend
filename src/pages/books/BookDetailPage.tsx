import { useEffect } from "react";
import { useDemo } from "../../features/demo/demoContext";
import { demoCatalog, demoBookKey } from "../../features/demo/fixtures";
import { Link, useLocation, useParams } from "react-router-dom";
import { BookCover } from "../../features/books/components/BookCover";
import { BookAuthors } from "../../features/books/components/BookAuthors";
import { BookCommunity } from "../../features/books/components/BookCommunity";
import { BookSaveAction } from "../../features/books/components/BookSaveAction";
import { BookRequestError } from "../../features/books/components/BookRequestError";
import { bookLink, searchOrigin } from "../../features/books/bookLinks";
import { parseBookDetail } from "../../features/books/schemas/bookDetail.schemas";
import { useFetch } from "../../shared/hooks/useFetch";
import { API_ENDPOINTS } from "../../shared/config/config.api";
import { FeedbackState } from "../../components/FeedbackState";

const DetailContent = ({
  provider,
  providerBookId,
}: {
  provider: string;
  providerBookId: string;
}) => {
  const location = useLocation();
  const demo = useDemo();
  const cached = demo.active
    ? demo.state.snapshots[demoBookKey(provider, providerBookId)]
    : undefined;
  const local =
    provider === "demo"
      ? demoCatalog.find((book) => book.providerBookId === providerBookId)
      : undefined;
  const fromSearch = searchOrigin(
    (location.state as { fromSearch?: unknown } | null)?.fromSearch,
  );
  const baseUrl = `${API_ENDPOINTS.BOOKS.replace(/\/+$/, "")}/${encodeURIComponent(provider)}/${encodeURIComponent(providerBookId)}`;
  const detail = useFetch({
    url: baseUrl,
    queryKey: `${baseUrl}:${demo.active ? "demo" : "remote"}`,
    enabled: provider !== "demo" && !cached,
    parseResponse: parseBookDetail,
  });
  const book = local ?? cached ?? detail.data;
  useEffect(() => {
    if (demo.active && detail.data) demo.store.remember(detail.data);
  }, [demo.active, demo.store, detail.data]);
  const metadata = book
    ? [
        ["Editorial", book.publisher],
        ["Publicación", book.publishedDate],
        [
          "Páginas",
          book.pageCount && book.pageCount > 0 ? String(book.pageCount) : null,
        ],
        ["Idioma", book.language],
        ...book.industryIdentifiers.map((entry) => [
          entry.type,
          entry.identifier,
        ]),
      ]
    : [];
  return (
    <div className="page-container book-detail">
      <Link className="text-link" to={fromSearch ?? "/buscar"}>
        {fromSearch ? "← Volver a resultados" : "← Explorar libros"}
      </Link>
      {provider === "demo" && !local && (
        <FeedbackState title="No encontramos este libro de muestra" />
      )}
      {detail.loading && <FeedbackState title="Abriendo el libro…" />}
      {detail.error && (
        <BookRequestError
          title="No se pudo cargar la ficha del libro"
          message={detail.error}
          retry={detail.refetch}
        />
      )}
      {book && (
        <>
          <section className="book-detail-hero">
            <BookCover
              src={book.thumbnail}
              title={book.title}
              loading="eager"
            />
            <div>
              <p className="eyebrow">Ficha del libro</p>
              <h1>{book.title}</h1>
              {book.subtitle && (
                <p className="book-subtitle">{book.subtitle}</p>
              )}
              <p className="book-author">
                <BookAuthors authors={book.authors} />
              </p>
              <BookSaveAction book={book} />
              <div className="inline-actions book-external-links">
                {book.previewLink && (
                  <a
                    className="text-link"
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vista previa ↗
                  </a>
                )}
                {book.canonicalVolumeLink && (
                  <a
                    className="text-link"
                    href={book.canonicalVolumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Books ↗
                  </a>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      <BookCommunity
        baseUrl={baseUrl}
        returnTo={bookLink(provider, providerBookId)}
        externalRating={book?.externalRating ?? null}
      >
        {book && (
          <section
            className="book-information"
            aria-labelledby="description-heading"
          >
            <div>
              <h2 id="description-heading">Sobre este libro</h2>
              <p className="book-description">
                {book.description ||
                  "No hay descripción disponible para esta edición."}
              </p>
            </div>
            <aside>
              <h2>Datos de esta edición</h2>
              {book.categories.length > 0 && (
                <div className="book-genres">
                  {book.categories.map((category, index) => (
                    <span key={`${category}:${index}`}>{category}</span>
                  ))}
                </div>
              )}
              <dl>
                {metadata
                  .filter(([, value]) => value)
                  .map(([label, value], index) => (
                    <div key={`${label}:${index}`}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
            </aside>
          </section>
        )}
      </BookCommunity>
    </div>
  );
};

export const BookDetailPage = () => {
  const { provider = "", providerBookId = "" } = useParams();
  return (
    <DetailContent
      key={`${provider}:${providerBookId}`}
      provider={provider}
      providerBookId={providerBookId}
    />
  );
};
