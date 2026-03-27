const PORT = String(import.meta.env.VITE_PORT);

export const USER_ME_BOOKS_ENDOPINT = String(
  import.meta.env.VITE_API_USERS_ME_BOOKS_ENDPOINT ||
    `http://127.0.0.1:${PORT}/api/v1/users/me/books`,
);

export const API_ENDPOINTS = {
  REGISTER: String(
    import.meta.env.VITE_API_REGISTER_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/auth/register`,
  ),
  LOGIN: String(
    import.meta.env.VITE_API_LOGIN_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/auth/login`,
  ),
  LOGOUT: String(
    import.meta.env.VITE_API_LOGOUT_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/auth/logout`,
  ),
  ME: String(
    import.meta.env.VITE_API_ME_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/auth/me`,
  ),
  REFRESH: String(
    import.meta.env.VITE_API_REFRESH_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/auth/refresh`,
  ),
  BOOKS_SEARCH: String(
    import.meta.env.VITE_API_BOOKS_SEARCH_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/books/search`,
  ),
  BOOK_SAVE: USER_ME_BOOKS_ENDOPINT,

  GET_USERBOOKS: USER_ME_BOOKS_ENDOPINT,

  DELETE_USERBOOK: USER_ME_BOOKS_ENDOPINT,

  GET_USER_LISTS: String(
    import.meta.env.VITE_API_USERS_ME_LISTS ||
      `http://127.0.0.1:${PORT}/api/v1/users/me/lists`,
  ),
  USER_BOOKS: USER_ME_BOOKS_ENDOPINT
} as const;
