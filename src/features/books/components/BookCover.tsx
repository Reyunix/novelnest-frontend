import { useState } from "react";
import { toSecureUrl } from "../../../shared/http/secureUrl";

const Cover = ({
  src,
  title,
  loading,
}: {
  src?: string | null;
  title: string;
  loading: "lazy" | "eager";
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="book-cover">
      {src && !failed ? (
        <img
          src={src}
          alt={`Portada de ${title}`}
          loading={loading}
          width="128"
          height="192"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="book-cover-fallback"
          aria-label={`Sin portada: ${title}`}
        >
          <span aria-hidden="true">N</span>
          <span>{title}</span>
        </div>
      )}
    </div>
  );
};
export const BookCover = ({
  src,
  title,
  loading = "lazy",
}: {
  src?: string | null;
  title: string;
  loading?: "lazy" | "eager";
}) => (
  <Cover key={src} src={toSecureUrl(src)} title={title} loading={loading} />
);
