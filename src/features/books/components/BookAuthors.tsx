import { Link } from "react-router-dom";
import { isKnownAuthor } from "../bookLinks";
import { searchLink } from "../searchQuery";

export const BookAuthors = ({ authors }: { authors: string[] }) => (
  <span>
    {authors.length
      ? authors.map((author, index) => (
          <span key={`${author}:${index}`}>
            {isKnownAuthor(author) ? (
              <Link to={searchLink(author.trim(), "author")}>{author}</Link>
            ) : (
              author.trim() || "Autor desconocido"
            )}
            {index < authors.length - 1 ? ", " : ""}
          </span>
        ))
      : "Autor desconocido"}
  </span>
);
