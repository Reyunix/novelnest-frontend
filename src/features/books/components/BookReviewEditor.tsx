import { StarRating } from "./StarRating";
import {
  readReviewDraft,
  writeReviewDraft,
  type ReviewDraft,
} from "../reviewDraft";
import { useState } from "react";
import type { Review } from "../schemas/bookDetail.schemas";
import { submitBookReview } from "../books.api";
import { errorMessage } from "../../../shared/http/request";

export const BookReviewEditor = ({
  own,
  draftKey,
  url,
  onSaved,
  onCancel,
}: {
  own: Review | null;
  draftKey: string;
  url: string;
  onSaved: (review: Review | null) => Promise<void>;
  onCancel?: () => void;
}) => {
  const [draft, setDraft] = useState(() =>
    readReviewDraft(draftKey, {
      rating: own?.rating?.toString() ?? "",
      text: own?.text ?? "",
    }),
  );
  const { rating, text } = draft;
  const changeDraft = (next: ReviewDraft) => {
    setDraft(next);
    writeReviewDraft(draftKey, next);
  };
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const mutate = async (remove = false) => {
    if (pending) return;
    setError(null);
    setMessage("");
    if (!remove && !rating && !text.trim()) {
      setError("Selecciona una puntuación o escribe una reseña.");
      return;
    }
    setPending(true);
    try {
      const saved = await submitBookReview(
        url,
        remove
          ? null
          : {
              rating: rating ? Number(rating) : null,
              text: text.trim() || null,
            },
      );
      writeReviewDraft(draftKey, null);
      setDraft({
        rating: saved?.rating?.toString() ?? "",
        text: saved?.text ?? "",
      });
      if (remove) setConfirmDelete(false);
      setMessage(remove ? "Aportación retirada." : "Aportación publicada.");
      await onSaved(saved);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setPending(false);
    }
  };
  return (
    <form
      className="review-form"
      onSubmit={(event) => {
        event.preventDefault();
        void mutate();
      }}
      aria-busy={pending}
    >
      <h3>{own ? "Tu valoración y reseña" : "Comparte tu lectura"}</h3>
      <p>
        Tu puntuación y tu reseña serán públicas junto a tu nombre de usuario.
      </p>
      <label htmlFor="review-rating">Tu puntuación</label>
      <select
        id="review-rating"
        value={rating}
        disabled={pending}
        onChange={(event) =>
          changeDraft({ ...draft, rating: event.target.value })
        }
      >
        <option value="">Sin puntuación</option>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value} de 5
          </option>
        ))}
      </select>
      {rating && <StarRating value={Number(rating)} />}
      <label htmlFor="review-text">Tu reseña (opcional)</label>
      <textarea
        id="review-text"
        rows={6}
        maxLength={5000}
        value={text}
        disabled={pending}
        onChange={(event) =>
          changeDraft({ ...draft, text: event.target.value })
        }
      />
      <small>{text.length}/5.000 caracteres</small>
      <div className="inline-actions">
        <button className="button button-primary" disabled={pending}>
          {pending
            ? "Guardando…"
            : own
              ? "Actualizar aportación"
              : "Publicar aportación"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="button button-secondary"
            disabled={pending}
            onClick={onCancel}
          >
            Cancelar edición
          </button>
        )}
        {own && (
          <button
            type="button"
            className="text-button danger-text"
            disabled={pending}
            onClick={() => setConfirmDelete(true)}
          >
            Retirar aportación
          </button>
        )}
      </div>
      {confirmDelete && (
        <div className="delete-confirmation">
          <p>¿Retirar tu puntuación y tu reseña públicas?</p>
          <div className="inline-actions">
            <button
              type="button"
              className="button button-danger"
              disabled={pending}
              onClick={() => void mutate(true)}
            >
              Sí, retirar
            </button>
            <button
              type="button"
              className="button button-secondary"
              disabled={pending}
              onClick={() => setConfirmDelete(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      {message && <p role="status">{message}</p>}
    </form>
  );
};
