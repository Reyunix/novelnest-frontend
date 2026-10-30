import { demoCatalog } from "./fixtures";
import { BookCard } from "../books/components/BookCard";
export const DemoCatalog = () => (
  <section className="demo-catalog" aria-labelledby="demo-catalog-title">
    <h2 id="demo-catalog-title">Catálogo de muestra</h2>
    <p>
      Ocho libros ficticios para probar todas las funciones. No consumen
      consultas externas. Usa el buscador para consultar Google Books.
    </p>
    <div className="book-grid">
      {demoCatalog.map((book) => (
        <BookCard key={book.providerBookId} provider="demo" bookItem={book} />
      ))}
    </div>
  </section>
);
