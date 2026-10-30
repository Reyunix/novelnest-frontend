import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import {
  parseCommunity,
  parseOwnReview,
  type BookDetail,
  type Review,
} from "../schemas/bookDetail.schemas";
import { useFetch } from "../../../shared/hooks/useFetch";
import { BookRequestError } from "./BookRequestError";
import { BookReviewEditor } from "./BookReviewEditor";

export const BookCommunity = ({
  baseUrl,
  returnTo,
  externalRating,
  children,
}: {
  baseUrl: string;
  returnTo: string;
  externalRating: BookDetail["externalRating"] | null;
  children: ReactNode;
}) => {
  const { isAuthenticated, authStatus, user } = useAuth();
  const [page, setPage] = useState(1);
  const community = useFetch({
    url: `${baseUrl}/community?page=${page}&limit=10`,
    parseResponse: parseCommunity,
  });
  const own = useFetch({
    url: `${baseUrl}/reviews/me`,
    queryKey: `${baseUrl}:own:${user?.userId ?? "guest"}`,
    enabled: isAuthenticated,
    parseResponse: parseOwnReview,
  });
  const onSaved = async (review: Review | null) => {
    own.updateData(() => review);
    await community.refetch();
  };
  return (
    <section className="book-community" aria-labelledby="community-heading">
      <h2 id="community-heading">Valoraciones de NovelNest</h2>
      <div className="book-rating" aria-live="polite">
        {community.loading ? (
          <p>Cargando valoraciones…</p>
        ) : community.data ? (
          <>
            <strong>
              {community.data.average === null
                ? "Sin valoraciones"
                : `${community.data.average.toFixed(1)} / 5`}
            </strong>
            <span>
              {community.data.ratingsCount}{" "}
              {community.data.ratingsCount === 1
                ? "valoración"
                : "valoraciones"}{" "}
              en NovelNest
            </span>
          </>
        ) : null}
        {externalRating && (
          <p className="external-rating">
            Google Books: {externalRating.average.toFixed(1)} / 5
            {externalRating.count !== null
              ? ` · ${externalRating.count} valoraciones`
              : ""}
          </p>
        )}
      </div>
      {community.error && (
        <BookRequestError message={community.error} retry={community.refetch} />
      )}
      {children}
      <h2>La comunidad de NovelNest</h2>
      {authStatus === "loading" ? (
        <p>Comprobando sesión…</p>
      ) : !isAuthenticated ? (
        <p>
          <Link to={`/login?returnTo=${encodeURIComponent(returnTo)}`}>
            Inicia sesión para valorar o escribir una reseña
          </Link>
        </p>
      ) : own.loading && !own.data ? (
        <p>Cargando tu aportación…</p>
      ) : own.error ? (
        <BookRequestError message={own.error} retry={own.refetch} />
      ) : (
        <BookReviewEditor
          key={user?.userId}
          own={own.data}
          draftKey={`novelnest:review-draft:${user?.userId}:${baseUrl}`}
          url={`${baseUrl}/reviews/me`}
          onSaved={onSaved}
        />
      )}
      <h3>Reseñas de lectores</h3>
      {community.data && (
        <>
          {!community.data.items.length && (
            <p>
              Todavía no hay reseñas. Comparte tu experiencia con este libro.
            </p>
          )}
          <div className="review-list">
            {community.data.items.map((review) => (
              <article className="community-review" key={review.id}>
                <div className="review-heading">
                  <strong>{review.user.name}</strong>
                  {review.rating !== null && <span>{review.rating} / 5</span>}
                </div>
                <time dateTime={review.createdAt}>
                  {new Intl.DateTimeFormat("es", {
                    dateStyle: "medium",
                  }).format(new Date(review.createdAt))}
                </time>
                <p className="book-description">{review.text}</p>
              </article>
            ))}
          </div>
          <nav className="pagination" aria-label="Páginas de reseñas">
            <button
              className="button button-secondary"
              disabled={community.loading || community.data.page <= 1}
              onClick={() => setPage(community.data!.page - 1)}
            >
              Anterior
            </button>
            <span>
              Página {community.data.page} de {community.data.totalPages}
            </span>
            <button
              className="button button-secondary"
              disabled={
                community.loading ||
                community.data.page >= community.data.totalPages
              }
              onClick={() => setPage(community.data!.page + 1)}
            >
              Siguiente
            </button>
          </nav>
        </>
      )}
    </section>
  );
};
