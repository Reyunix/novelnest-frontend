import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div>
        <Link className="footer-brand" to="/inicio">
          Novelnest<span aria-hidden="true">.</span>
        </Link>
        <p>Un lugar para tus lecturas.</p>
      </div>
      <nav aria-label="Enlaces del pie de página">
        <Link to="/buscar">Explorar libros</Link>
        <Link to="/mis-libros">Mi biblioteca</Link>
        <Link to="/contact">Sobre el proyecto</Link>
        <a
          href="https://github.com/Reyunix"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </div>
    <p className="footer-note">
      Hecho para quienes siempre tienen un libro pendiente. Catálogo de Google
      Books.
    </p>
  </footer>
);
