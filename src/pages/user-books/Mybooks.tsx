import { BookDisplay } from "../../features/books/components/BookDisplay";
import { useGetUserBooks } from "../../features/books/hooks/useGetUserBooks";

export const Mybooks = () => {
  const { data, loading, error } = useGetUserBooks();

  return (
    <div className="my-books-page-layout">
      <h1>Mis Libros</h1>
      <section className="books">
        {loading ? (
          <span>Cargando ...</span>
        ) : error ? (
          <span>{error}</span>
        ) : data ? (
          data?.map((userBook) => {
            return <BookDisplay key={userBook.id} userBook={userBook}></BookDisplay>;
          })
        ) : (
          <span>
            No tienes ningún libro guardado. ¡Comineza a coleccionar desde la
            página de búsqueda!
          </span>
        )}
      </section>
    </div>
  );
};
