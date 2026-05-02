import { NavLink } from "react-router-dom";

export const Inicio: React.FC = () => {
  return (
    <div className="layout">
      <div className="hero-container section-padding">
        <section className="hero-section" aria-labelledby="inicio-title">
          <h1 id="inicio-title" className="main-title">
            Bienvenido a <em>Novelnest</em>
          </h1>
          <p className="subtitle">
            Comienza a organizar, recordar y dar seguimiento a <em>todas tus lecturas</em>.
          </p>
          <p>
            Un lugar pensado para quienes disfrutan leyendo y quieren reunir su
            biblioteca personal en un espacio claro, cómodo y fácil de consultar.
          </p>
          <NavLink to="/buscar" className="action-link hover-opacity">
            ¡Busca tus obras favoritas!
          </NavLink>
        </section>
      </div>

      <div className="home-content-layout section-padding">
        <section className="main-section" aria-labelledby="introduction">
          <article className="article">
            <section id="introduction">
              <h2>¿Te gusta leer?</h2>
              <p>
                Estás en el lugar indicado. Este es un rincón personal en el que
                podrás guardar todas tus obras favoritas y llevarlas contigo a
                cualquier parte. Nos complace poder acompañarte en el
                maravilloso mundo de la lectura.
              </p>
              <p>
                Novelnest te ayuda a convertir lecturas sueltas en una colección
                viva: una biblioteca que puedes revisar, ordenar y ampliar a tu
                ritmo.
              </p>
            </section>

            <section aria-labelledby="funciones-principales">
              <h2 id="funciones-principales">¿Qué puedes hacer en Novelnest?</h2>
              <p>
                En esta web podrás crear tu propia biblioteca personal con
                <strong> listas personalizadas</strong> de libros. Podrás
                organizarlos, clasificarlos y llevar un seguimiento sencillo de
                todo lo que lees.
              </p>
              <ul>
                <li>Visualizar libros disponibles y descubrir nuevas lecturas.</li>
                <li>Crear múltiples listas y clasificarlas por temática o género.</li>
                <li>Marcar libros como leídos o en proceso de lectura.</li>
                <li>Filtrar los libros por género, autor o estado de lectura.</li>
                <li>Consultar el progreso de tus lecturas de un vistazo.</li>
              </ul>
            </section>

            <section aria-labelledby="como-empezar">
              <h2 id="como-empezar">Cómo empezar</h2>
              <ol>
                <li>Busca un libro por título o autor.</li>
                <li>Añádelo a tu colección personal.</li>
                <li>Organízalo en la lista que prefieras.</li>
                <li>Vuelve cuando quieras para seguir leyendo o descubrir más.</li>
              </ol>
            </section>

            <section aria-labelledby="por-que-usarla">
              <h2 id="por-que-usarla">Por qué usar Novelnest</h2>
              <p>
                Porque leer no es solo terminar libros: también es recordarlos,
                relacionarlos entre sí y conservar aquello que te hicieron
                sentir. Novelnest quiere ayudarte a que tu experiencia lectora
                tenga continuidad y orden sin perder cercanía.
              </p>
              <p>
                Tanto si lees de forma constante como si vas por temporadas,
                aquí tendrás un punto de apoyo para volver a tus historias,
                revisar tus pendientes y preparar tus próximas lecturas.
              </p>
            </section>

            <section aria-labelledby="cta-home">
              <h2 id="cta-home">Tu próxima lectura puede empezar aquí</h2>
              <p>
                Explora títulos, guarda tus favoritos y construye una biblioteca
                digital que crezca contigo.
              </p>
              <NavLink to="/mis-libros" className="action-link hover-opacity">
                ¡Empieza a coleccionar!
              </NavLink>
            </section>
          </article>
        </section>

        <aside className="top-books-section small-section" aria-labelledby="top-books-title">
          <article>
            <h2 id="top-books-title">Top libros del mes</h2>
            <p>
              Una pequeña selección para inspirarte si no sabes cuál será tu
              próxima lectura.
            </p>
            <ol className="top-books-items">
              <li>
                <em>
                  <strong>La llamada</strong>, Leila Guerriero
                </em>
              </li>
              <li>
                <em>
                  <strong>La biblioteca de la medianoche</strong>, Matt Haig
                </em>
              </li>
              <li>
                <em>
                  <strong>El club de los libros prohibidos</strong>, Kim
                  Hyun-sook, Ryan Estrada, Ko Hyung-ju
                </em>
              </li>
              <li>
                <em>
                  <strong>Un cuento perfecto</strong>, Elísabet Benavent
                </em>
              </li>
              <li>
                <em>
                  <strong>La sombra del viento</strong>, Carlos Ruiz Zafón
                </em>
              </li>
              <li>
                <em>
                  <strong>1984</strong>, George Orwell
                </em>
              </li>
              <li>
                <em>
                  <strong>Los siete maridos de Evelyn Hugo</strong>, Taylor
                  Jenkins Reid
                </em>
              </li>
              <li>
                <em>
                  <strong>El cuento de la criada</strong>, Margaret Atwood
                </em>
              </li>
              <li>
                <em>
                  <strong>Matar a un ruiseñor</strong>, Harper Lee
                </em>
              </li>
            </ol>
          </article>
        </aside>
      </div>
    </div>
  );
};
