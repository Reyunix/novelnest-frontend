import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { useFetch } from "../hooks/useFetch";

export const SearchPage = () => {
  const [queryInput, setQueryInput] = useState("");
  const [triggerInput, setTriggerInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const PORT = String(import.meta.env.VITE_PORT);

  const URL = `http://localhost:${PORT}/api/v1/books?q=${encodeURIComponent(
    queryInput
  )}`;

  const { data, loading, error } = useFetch({
    URL: URL,
    triggerInput: triggerInput,
  });

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const encoded = encodeURIComponent(query.trim());
    setQueryInput(encoded);
    setInputValue(query);
  };

  const querySubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && queryInput) {
      setTriggerInput((prev) => !prev);
      setInputValue("");
    }
  };

  useEffect(() => {
    setTriggerInput(false);
    setQueryInput("");
  }, [loading]);

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
        {loading && <span className="centered-self">Cargando...</span>}

        {error && <span>Error en el servidor, disculpe las molestias.</span>}
        {data
          ? data.items?.map((bookItem) => {
              return <BookCard key={bookItem.id} bookItem={bookItem} />;
            })
          : !loading && !error && <span>No hay usuarios</span>}
      </section>
    </div>
  );
};
