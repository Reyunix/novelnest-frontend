const DEFAULT_PORT = "3000";
const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ??
  import.meta.env.VITE_BASE_URL ??
  `http://localhost:${import.meta.env.VITE_PORT ?? DEFAULT_PORT}`;

const API_BASE_URL = String(rawBaseUrl).replace(/\/+$/, "");

const buildApiUrl = (endpoint: string | undefined, fallbackPath: string): string => {
  const path = endpoint ?? fallbackPath;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const USER_ME_BOOKS_ENDPOINT = buildApiUrl(
  import.meta.env.VITE_API_USERS_ME_BOOKS_ENDPOINT,
  "/api/v1/users/me/books",
);

export const API_ENDPOINTS = {
  REGISTER: buildApiUrl(
    import.meta.env.VITE_API_REGISTER_ENDPOINT,
    "/api/v1/auth/register",
  ),
  LOGIN: buildApiUrl(
    import.meta.env.VITE_API_LOGIN_ENDPOINT,
    "/api/v1/auth/login",
  ),
  LOGOUT: buildApiUrl(
    import.meta.env.VITE_API_LOGOUT_ENDPOINT,
    "/api/v1/auth/logout",
  ),
  ME: buildApiUrl(
    import.meta.env.VITE_API_ME_ENDPOINT,
    "/api/v1/auth/me",
  ),
  REFRESH: buildApiUrl(
    import.meta.env.VITE_API_REFRESH_ENDPOINT,
    "/api/v1/auth/refresh",
  ),
  BOOKS_SEARCH: buildApiUrl(
    import.meta.env.VITE_API_BOOKS_SEARCH_ENDPOINT,
    "/api/v1/books/search",
  ),
  BOOK_SAVE: USER_ME_BOOKS_ENDPOINT,
  GET_USERBOOKS: USER_ME_BOOKS_ENDPOINT,
  DELETE_USERBOOK: USER_ME_BOOKS_ENDPOINT,
  USER_BOOKS: USER_ME_BOOKS_ENDPOINT,
  GET_USER_LISTS: buildApiUrl(
    import.meta.env.VITE_API_USERS_ME_LISTS,
    "/api/v1/users/me/lists",
  ),
} as const;
