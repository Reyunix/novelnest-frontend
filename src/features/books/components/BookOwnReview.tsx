import { useEffect, useRef, useState } from "react";
import type { Review } from "../schemas/bookDetail.schemas";
import { BookReviewEditor } from "./BookReviewEditor";
import { StarRating } from "./StarRating";

export const BookOwnReview = ({
  own,
  draftKey,
  url,
  onSaved,
}: {
  own: Review | null;
  draftKey: string;
  url: string;
  onSaved: (review: Review | null) => Promise<void>;
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
      review
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
          draftKey={draftKey}
          url={url}
          onSaved={saved}
          onCancel={own ? () => setEditing(false) : undefined}
        />
      ) : (
        <article
          className="community-review own-review"
          aria-label="Tu aportación publicada"
        >
          <div className="review-heading">
            <h3>Tu aportación</h3>
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
