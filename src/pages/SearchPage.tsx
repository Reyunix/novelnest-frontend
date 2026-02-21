import { useState } from "react";
import { BookCard } from "../components/BookCard";
import { useFetch } from "../hooks/useFetch";

export const SearchPage = () => {
  const [queryInput, setQueryInput] = useState("");
  const [triggerInput, setTriggerInput] = useState(false);
  const normalizedQuery = queryInput.trim();

  const PORT = String(import.meta.env.VITE_PORT);

  const URL = `https://127.0.0.1:${PORT}/api/v1/books?q=${encodeURIComponent(
    normalizedQuery
  )}`;

  const { data, loading, error } = useFetch({
    URL: URL,
    triggerInput: triggerInput,
  });

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  const querySubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && normalizedQuery) {
      setTriggerInput((prev) => !prev);
    }
  };

  return (
    <div className="search-page-layout">
      <input
        value={queryInput}
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
        {loading && <span className="centered-self">Cargando...</span>}

        {error && <span>Error en el servidor, disculpe las molestias.</span>}
        {data
          ? data.items?.map((bookItem) => {
              return <BookCard key={bookItem.id} bookItem={bookItem} />;
            })
          : !loading && !error && <span>No hay resultados</span>}
      </section>
    </div>
  );
};
