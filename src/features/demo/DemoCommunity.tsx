import type { BookDetail } from "../books/schemas/bookDetail.schemas";
import type { ReactNode } from "react";
import { useAuth } from "../auth/authContext";
import { BookOwnReview } from "../books/components/BookOwnReview";
import { StarRating } from "../books/components/StarRating";
import { useDemo } from "./demoContext";
import { DemoStartButton } from "./DemoControls";
import { demoBookKey, demoReviewExamples } from "./fixtures";

export const DemoCommunity = ({
  returnTo,
  children,
  externalRating,
}: {
  returnTo: string;
  externalRating: BookDetail["externalRating"];
  children: ReactNode;
}) => {
  const { active, state, store } = useDemo();
  const { isAuthenticated } = useAuth();
  const parts = returnTo.split("/");
  const key = demoBookKey(
    decodeURIComponent(parts[2] ?? ""),
    decodeURIComponent(parts[3] ?? ""),
  );
  const own = state.reviews[key] ?? null;
  return (
    <section className="book-community" aria-label="Comunidad de demostración">
      <h2>Comunidad · demo</h2>
      <p>
        Las puntuaciones y reseñas de esta demo son ilustrativas. No modifican
        las valoraciones reales de NovelNest.
      </p>
      {externalRating && (
        <p className="external-rating">
          Google Books:{" "}
          <StarRating value={externalRating.average} decimals={1} />
        </p>
      )}
      {children}
      <div className="community-participation">
        <h2>Prueba tu valoración y reseña</h2>
        {active ? (
          <BookOwnReview
            key={`${key}:${state.epoch}`}
            own={own}
            draftKey={`novelnest:demo-draft:${state.epoch}:${key}`}
            url=""
            demo
            saveContribution={async (input) => store.saveReview(key, input)}
            onSaved={async () => {}}
          />
        ) : !isAuthenticated ? (
          <DemoStartButton />
        ) : (
          <p>Abre una ficha del catálogo real para publicar con tu cuenta.</p>
        )}
      </div>
      <h3 className="reader-reviews-heading">
        Reseñas de ejemplo · contenido ilustrativo
      </h3>
      {demoReviewExamples.map((review) => (
        <article className="community-review" key={review.id}>
          <div className="review-heading">
            <strong>{review.user.name}</strong>
            <StarRating value={review.rating!} />
          </div>
          <p>{review.text}</p>
        </article>
      ))}
    </section>
  );
};
