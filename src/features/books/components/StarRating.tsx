export const StarRating = ({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) => {
  const rating = Math.max(0, Math.min(5, value));
  const label = rating.toLocaleString("es", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span
      className="star-rating"
      role="img"
      aria-label={`${label} de 5 estrellas`}
    >
      <span className="rating-stars" aria-hidden="true">
        <span>★★★★★</span>
        <span
          className="rating-stars-filled"
          style={{ width: `${rating * 20}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span aria-hidden="true">{label}/5</span>
    </span>
  );
};
