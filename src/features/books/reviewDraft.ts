export type ReviewDraft = { rating: string; text: string };
type DraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const readReviewDraft = (
  key: string,
  fallback: ReviewDraft,
  storage?: DraftStorage,
): ReviewDraft => {
  try {
    const value: unknown = JSON.parse(
      (storage ?? globalThis.sessionStorage).getItem(key) ?? "null",
    );
    if (
      value &&
      typeof value === "object" &&
      "rating" in value &&
      "text" in value &&
      typeof value.rating === "string" &&
      ["", "1", "2", "3", "4", "5"].includes(value.rating) &&
      typeof value.text === "string" &&
      value.text.length <= 5000
    )
      return { rating: value.rating, text: value.text };
  } catch {
    /* Storage may be unavailable; the in-memory draft still works. */
  }
  return fallback;
};

export const writeReviewDraft = (
  key: string,
  draft: ReviewDraft | null,
  storage?: DraftStorage,
) => {
  try {
    const target = storage ?? globalThis.sessionStorage;
    if (draft === null) target.removeItem(key);
    else target.setItem(key, JSON.stringify(draft));
  } catch {
    /* Private mode or quota must not block publishing. */
  }
};
