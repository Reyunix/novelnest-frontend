# NovelNest Frontend

Biblioteca personal desarrollada con React 19, TypeScript y Vite. Permite descubrir libros en Google Books a través del backend, guardarlos y organizar su estado de lectura.

## Ejecutar en local

Desde el repositorio principal, `bun run dev` inicia PostgreSQL, backend y frontend. Para arrancar únicamente este frontend:

```sh
bun install
bun run dev
```

Frontend: http://localhost:5173. Backend: http://localhost:3000. Usa `localhost` en ambos servicios para mantener la sesión mediante cookies.

Copia `.env.example` a `.env.local` si necesitas configurar el backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Las rutas de la API tienen valores predeterminados. Los overrides `VITE_API_*_ENDPOINT` admiten rutas o URLs completas. Las claves de Google Books pertenecen exclusivamente al backend.

## Funciones

- Portada con selección editorial y acceso directo al catálogo.
- Búsqueda por título, autor y tema, ordenación y páginas de 12 resultados.
- Consulta aplicada en la URL: enlaces compartidos, recarga y navegación del historial.
- Ficha pública por edición con descripción, autores enlazados, metadatos y puntuación externa secundaria.
- Puntuaciones y reseñas públicas propias; media de NovelNest y reseñas paginadas en el servidor.
- Biblioteca compartida entre páginas: guardar, cambiar estado y eliminar con confirmación.
- Filtros con recuentos, búsqueda por título/autor dentro de la colección y ordenación.
- Formularios de registro y acceso tipados, validación Zod y retorno tras el login.
- Renovación de sesión compartida entre peticiones concurrentes, estados de error y reintentos.
- Portadas con alternativa cuando faltan o no cargan; navegación por teclado y diseño adaptable.

## Estructura

- `src/features/books`: contratos Zod, consulta del catálogo y fuente compartida de la biblioteca.
- `src/features/auth`: sesión, validación de formularios y destinos de retorno.
- `src/shared/http`: cliente HTTP, renovación de sesión y cancelación de consultas.
- `src/pages`: pantallas cargadas por ruta.
- `src/components`: campos, portadas y estados de interfaz reutilizables.
- `src/styles`: base, layout, home, libros, formularios y reglas adaptables.
- `tests`: regresiones de parámetros, errores HTTP, sesión y concurrencia.

La biblioteca se conserva en un proveedor por sesión y actualiza sus datos con la respuesta de cada mutación. Se reinicia al cambiar de usuario o cerrar sesión. Las lecturas pendientes se invalidan al cambiar de consulta, desmontar o aplicar una mutación.

## Comprobaciones

```sh
bun run test
bun run lint
bun run build
```

Las pruebas usan el runner incluido en Bun. Las comprobaciones manuales se realizan con el backend local y una cuenta de prueba.

## Límites actuales

Google Books puede devolver errores temporales y estimaciones variables del total. La interfaz pagina mediante `page` y `limit`; permite avanzar cuando la página recibida está completa y no presenta un número de páginas calculado a partir de ese total estimado.

La biblioteca descarga la colección completa porque el endpoint actual no ofrece paginación. Sus filtros y búsqueda se ejecutan sobre esos datos. Una colección grande requerirá paginación y búsqueda en el backend.

Las estanterías personalizadas, recomendaciones, recuperación de contraseña y contacto por formulario siguen fuera de esta versión. Los enlaces de la interfaz muestran únicamente destinos disponibles.

## Ficha y comunidad

La ruta pública `/libros/:provider/:providerBookId` permite abrir directamente una edición. Los títulos de los resultados y la biblioteca enlazan a ella. Cada autor conocido lleva a una búsqueda por autor.

La puntuación de NovelNest se calcula con aportaciones públicas de usuarios autenticados, independientemente de su biblioteca. La referencia de Google Books se muestra por separado. La ficha carga bibliografía y comunidad por separado para permitir reintentos independientes. El formulario conserva el borrador si falla una publicación.

En producción, el servidor del frontend debe servir `index.html` como alternativa para rutas de la SPA, incluida `/libros/*`.

## Mensajes de error

La interfaz utiliza un catálogo local de mensajes por código de error y alternativas por estado HTTP. Nunca muestra directamente `message` recibido del backend o de un proxy. Los códigos desconocidos, respuestas no JSON y errores de rutas reciben mensajes genéricos. Al añadir códigos de negocio, actualizar `src/shared/http/publicErrorMessage.ts` con una explicación útil para el usuario.

## Portfolio guest demo

Use **Probar sin registrarme** on Home or Login, or **Modo invitado** in navigation. The demo has eight fictional books, an initial library and illustrative reviews. Library changes and personal test reviews stay in `localStorage` (`novelnest:demo:v1`), with a validated and versioned format. No account, JWT or public contribution is created. A visible banner distinguishes the demo and explains storage limitations if the browser denies persistence.

**Salir del modo invitado** preserves the local data for another visit. **Reiniciar demo** confirms before restoring the seed library, clearing test reviews and saved detail snapshots, and resetting open editors. A real authenticated session takes priority and uses remote data exclusively, with no automatic import from the demo.

The sample detail routes (`/libros/demo/:fixtureId`) work without the backend. Submitted searches query the real catalogue with normal API limits. Real detail records opened in demo mode are stored locally so they can be reopened offline. Community actions stay local even on those real books; external Google ratings are shown separately. A quota error leaves the sample catalogue usable. Production builds include the configured Render API URL from `.env.production`.
