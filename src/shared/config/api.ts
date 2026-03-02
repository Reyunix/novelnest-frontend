const PORT = String(import.meta.env.VITE_PORT);

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
  BOOKS_SEARCH: String(
    import.meta.env.VITE_API_BOOKS_SEARCH_ENDPOINT ||
      `http://127.0.0.1:${PORT}/api/v1/books/search`,
  ),
} as const;
