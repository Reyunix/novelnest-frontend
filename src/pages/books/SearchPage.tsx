import { useState } from "react";
import { BookCard } from "../../components/BookCard";
import { useBookSearch } from "../../features/books/hooks/useBookSearch";

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const normalizedQuery = inputValue.trim();

  const { data, loading, error } = useBookSearch(submittedQuery);

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const querySubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    // Normalize input visually on Enter, but only submit non-empty queries.
    setInputValue(normalizedQuery);
    if (!normalizedQuery) return;

    setSubmittedQuery(normalizedQuery);
  };

  return (
    <div className="search-page-layout">
      <input
        value={inputValue}
        type="text"
        className="search-bar"
        onChange={(event) => {
          handleQueryInput(event);
        }}
        onKeyDown={(event) => {
          querySubmit(event);
        }}
      />
      <section className="grid-layout">
        {loading ? (
          <span className="centered-self">Cargando...</span>
        ) : error ? (
          <span>Error en el servidor, disculpe las molestias.</span>
        ) : data ? (
          data.items && data.items.length > 0 ? (
            data.items?.map((bookItem) => {
              return <BookCard key={bookItem.id} bookItem={bookItem} />;
            })
          ) : (
            <span className="centered-self">
              No se han encontrado resultados para su búsqueda.
            </span>
          )
        ) : (
          <span className="centered-self">
            Ingrese el título de un libro y presione Enter para buscar.
          </span>
        )}
      </section>
    </div>
  );
};
