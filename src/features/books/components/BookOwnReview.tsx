import { useEffect, useRef, useState } from "react";
import type { Review } from "../schemas/bookDetail.schemas";
import { BookReviewEditor } from "./BookReviewEditor";
import { StarRating } from "./StarRating";

export const BookOwnReview = ({
  own,
  draftKey,
  url,
  onSaved,
  saveContribution,
  demo = false,
}: {
  own: Review | null;
  draftKey: string;
  url: string;
  onSaved: (review: Review | null) => Promise<void>;
  saveContribution?: (
    input: { rating: number | null; text: string | null } | null,
  ) => Promise<Review | null>;
  demo?: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const showEditor = !own || editing;
  const editButton = useRef<HTMLButtonElement>(null);
  const previousEditor = useRef(showEditor);
  useEffect(() => {
    if (previousEditor.current && !showEditor) editButton.current?.focus();
    previousEditor.current = showEditor;
  }, [showEditor]);
  const saved = async (review: Review | null) => {
    const refresh = onSaved(review);
    setEditing(false);
    setNotice(
      demo
        ? review
          ? "Tu reseña de prueba se ha guardado."
          : "Tu reseña de prueba se ha retirado."
        : review
          ? "Tu aportación se ha publicado."
          : "Tu aportación se ha retirado.",
    );
    await refresh;
  };
  return (
    <div className="own-review-section">
      {showEditor ? (
        <BookReviewEditor
          own={own}
          demo={demo}
          saveContribution={saveContribution}
          draftKey={draftKey}
          url={url}
          onSaved={saved}
          onCancel={own ? () => setEditing(false) : undefined}
        />
      ) : (
        <article
          className="community-review own-review"
          aria-label={demo ? "Tu reseña de prueba" : "Tu aportación publicada"}
        >
          <div className="review-heading">
            <h3>{demo ? "Tu reseña de prueba" : "Tu aportación"}</h3>
            <button
              type="button"
              className="button button-secondary"
              ref={editButton}
              onClick={() => {
                setNotice("");
                setEditing(true);
              }}
            >
              Editar
            </button>
          </div>
          {own.rating !== null && <StarRating value={own.rating} />}
          {own.text && <p className="book-description">{own.text}</p>}
        </article>
      )}
      {notice && <p role="status">{notice}</p>}
    </div>
  );
};
