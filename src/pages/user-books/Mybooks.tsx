import { UserBooksDisplay } from "../../features/books/components/UserBooksDisplay";
export const Mybooks = () => {
  return (
    <div className="my-books-page-layout">
      <span className="my-books-page-header">
        <h1 className="my-books-page-title">Mis Libros</h1>{" "}
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Buscar y añadir libros" />
        </form>
      </span>
      <UserBooksDisplay />
    </div>
  );
};
