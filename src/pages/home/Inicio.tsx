import { useDemo } from "../../features/demo/demoContext";
import { DemoStartButton } from "../../features/demo/DemoControls";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/authContext";
import { searchLink } from "../../features/books/searchQuery";

const selection = [
  {
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    tone: "terracotta",
    letter: "Z",
    category: "Una ciudad, muchos secretos",
  },
  {
    title: "1984",
    author: "George Orwell",
    tone: "olive",
    letter: "O",
    category: "Para mirar el mundo de otra manera",
  },
  {
    title: "La biblioteca de la medianoche",
    author: "Matt Haig",
    tone: "ink",
    letter: "H",
    category: "Todas las vidas posibles",
  },
];

export const Inicio = () => {
  const { isAuthenticated } = useAuth();
  const { active: demo } = useDemo();
  return (
    <div className="page-shell home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="eyebrow">Un lugar para tus lecturas</p>
          <h1 id="home-title">
            Hay libros que
            <br />
            merecen <em>quedarse.</em>
          </h1>
          <p className="hero-description">
            Encuentra tu próxima historia, guarda tus pendientes y lleva contigo
            los libros que ya forman parte de ti.
          </p>
          <div className="hero-actions">
            <DemoStartButton />
            <Link className="button button-primary" to="/buscar">
              Descubrir libros <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="text-link"
              to={isAuthenticated || demo ? "/mis-libros" : "/register"}
            >
              {isAuthenticated
                ? "Volver a mi biblioteca"
                : demo
                  ? "Mi biblioteca de prueba"
                  : "Crear mi biblioteca"}{" "}
              ↗
            </Link>
          </div>
          <p className="hero-note">
            {isAuthenticated
              ? "Tu próxima lectura, a un paso de tu biblioteca."
              : demo
                ? "Tu biblioteca de prueba se guarda solo en este navegador."
                : "Prueba el modo invitado o crea una cuenta para guardar tus lecturas en línea."}
          </p>
        </div>
        <div
          className="library-preview"
          aria-label="Ejemplo ilustrativo de una biblioteca"
        >
          <div className="preview-header">
            <span className="eyebrow">Así puede verse tu biblioteca</span>
            <span className="example-badge">Ejemplo</span>
          </div>
          <div className="preview-book">
            <div className="drawn-cover cover-terracotta" aria-hidden="true">
              <span>
                La sombra
                <br />
                del viento
              </span>
              <small>C. R. Zafón</small>
            </div>
            <div>
              <span className="book-category">La historia continúa</span>
              <h2>
                Un libro para
                <br />
                volver a perderse.
              </h2>
              <p>La sombra del viento</p>
              <span className="status-tag">Leyendo</span>
            </div>
          </div>
          <div className="preview-shelves">
            <span>
              Quiero leer <strong>03</strong>
            </span>
            <span>
              Leyendo <strong>01</strong>
            </span>
            <span>
              Leídos <strong>12</strong>
            </span>
          </div>
          <p className="preview-caption">Tus historias, a tu ritmo.</p>
        </div>
      </section>
      <section className="home-how" aria-labelledby="how-title">
        <div className="section-heading">
          <p className="eyebrow">Simple, como elegir un libro</p>
          <h2 id="how-title">De un descubrimiento a tu estantería.</h2>
        </div>
        <div className="steps-grid">
          {[
            [
              "01",
              "Encuentra",
              "Busca por título, autor o tema. Una pista basta para empezar.",
            ],
            [
              "02",
              "Guarda",
              "Añade los libros que te interesan a tu biblioteca personal.",
            ],
            [
              "03",
              "Sigue leyendo",
              "Organiza tus libros entre pendientes, leyendo, leídos y abandonados.",
            ],
          ].map(([number, title, description]) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-selection" aria-labelledby="selection-title">
        <div className="section-heading heading-with-action">
          <div>
            <p className="eyebrow">Por si no sabes por dónde empezar</p>
            <h2 id="selection-title">Unas lecturas para descubrir.</h2>
          </div>
          <Link className="text-link" to="/buscar">
            Explorar catálogo ↗
          </Link>
        </div>
        <div className="selection-grid">
          {selection.map((book) => (
            <Link
              className="selection-card"
              key={book.title}
              to={searchLink(book.title, "title")}
            >
              <div
                className={`selection-art cover-${book.tone}`}
                aria-hidden="true"
              >
                <span className="selection-letter">{book.letter}</span>
                <span className="selection-art-title">{book.title}</span>
              </div>
              <div className="selection-copy">
                <span className="book-category">{book.category}</span>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span className="text-link">Buscar este libro →</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="catalog-credit">
          Selección editorial. Las ilustraciones son interpretaciones gráficas,
          no portadas oficiales.
        </p>
      </section>
      <section className="home-closing surface">
        <p className="eyebrow">El siguiente capítulo es tuyo</p>
        <h2>Haz sitio para tu próxima historia.</h2>
        <Link className="button button-primary" to="/buscar">
          Encontrar mi próxima lectura →
        </Link>
      </section>
    </div>
  );
};
