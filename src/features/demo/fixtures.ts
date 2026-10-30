import type { BookDetail, Review } from "../books/schemas/bookDetail.schemas";

// Fictional, locally authored portfolio content. These are not Google Books records.
const examples = [
  [
    "atlas",
    "El atlas de los caminos",
    "Elena Robles",
    "Aventura",
    "Una cartógrafa descubre que los mapas cambian con cada decisión de quienes los recorren.",
  ],
  [
    "cafe",
    "El café de las cartas",
    "Marcos Vidal",
    "Narrativa",
    "En un café de barrio, las cartas olvidadas conectan a vecinos que nunca se habían hablado.",
  ],
  [
    "mar",
    "La memoria del mar",
    "Lucía Arenas",
    "Misterio",
    "Una restauradora encuentra un diario entre los restos de un faro abandonado.",
  ],
  [
    "orbita",
    "La última órbita",
    "Daniel Sol",
    "Ciencia ficción",
    "La tripulación de una estación remota recibe un mensaje de una Tierra que creía perdida.",
  ],
  [
    "bosque",
    "El bosque de las horas",
    "Alba Montes",
    "Fantasía",
    "Una aprendiz de relojera entra en un bosque donde cada sendero conserva una época distinta.",
  ],
  [
    "reloj",
    "Un reloj para mañana",
    "Nora León",
    "Narrativa",
    "Dos hermanos heredan un taller y deben aprender a reparar algo más que relojes.",
  ],
  [
    "ciudad",
    "La ciudad que escucha",
    "Iván Costa",
    "Misterio",
    "Una periodista sigue una melodía que aparece cada noche en distintos puntos de la ciudad.",
  ],
  [
    "luna",
    "Bajo la misma luna",
    "Sara Ríos",
    "Romance",
    "Dos viajeros intercambian historias durante sus encuentros anuales en una pequeña estación.",
  ],
];
export const demoCatalog: BookDetail[] = examples.map(
  ([id, title, author, category, description], index) => ({
    provider: "demo",
    providerBookId: id!,
    title: title!,
    authors: [author!],
    categories: [category!],
    description: description!,
    subtitle: "Edición ilustrativa del portfolio",
    publisher: "Biblioteca de muestra",
    publishedDate: String(2018 + index),
    pageCount: 180 + index * 24,
    language: "es",
    thumbnail: null,
    canonicalVolumeLink: null,
    previewLink: null,
    maturityRating: null,
    industryIdentifiers: [],
    externalRating: null,
  }),
);
export const demoReviewExamples: Review[] = [
  {
    id: 90001,
    user: { name: "Lectura de ejemplo" },
    rating: 4,
    text: "Una historia con un comienzo sugerente y personajes que invitan a seguir leyendo. Reseña ilustrativa del portfolio.",
    createdAt: "2026-01-01T12:00:00.000Z",
    updatedAt: "2026-01-01T12:00:00.000Z",
  },
  {
    id: 90002,
    user: { name: "Opinión de ejemplo" },
    rating: 5,
    text: "Me ha gustado la atmósfera de esta lectura. Este contenido sirve para mostrar el diseño de las reseñas.",
    createdAt: "2026-01-02T12:00:00.000Z",
    updatedAt: "2026-01-02T12:00:00.000Z",
  },
];
export const demoBookKey = (provider: string, id: string) =>
  `${provider}:${id}`;
