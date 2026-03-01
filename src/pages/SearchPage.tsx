import { useState } from "react";
import { BookCard } from "../components/BookCard";
import { useFetch } from "../hooks/useFetch";

export const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const normalizedQuery = inputValue.trim();

  const PORT = String(import.meta.env.VITE_PORT);
  const URL = `https://127.0.0.1:${PORT}/api/v1/books/search?q=${encodeURIComponent(
    submittedQuery,
  )}`;

  const { data, loading, error } = useFetch({
    URL: URL,
    enabled: submittedQuery.length > 0,
  });

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const querySubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    // Normalize input: Trimm whitespace visually on enter press, but only submit if there's a non-empty query
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
