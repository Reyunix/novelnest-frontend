import { Link } from "react-router-dom";
export const NotFound = () => (
  <section className="page-shell feedback-state">
    <p className="eyebrow">Página 404</p>
    <h1>Esta página se ha perdido entre los libros.</h1>
    <p>La dirección que buscas no existe o ha cambiado.</p>
    <Link className="button button-primary" to="/inicio">
      Volver al inicio
    </Link>
  </section>
);
