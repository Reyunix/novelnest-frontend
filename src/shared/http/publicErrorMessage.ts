// UI text belongs to the client. Never render arbitrary messages from an API or proxy.
const messages: Record<string, string> = {
  BOOK_NOT_FOUND: "No hemos encontrado este libro.",
  ROUTE_NOT_FOUND: "Este contenido no está disponible en este momento.",
  INVALID_BOOK_PARAMS:
    "No se pudo abrir este libro. Vuelve a buscarlo en Explorar.",
  INVALID_REVIEW:
    "Selecciona una puntuación de 1 a 5 o escribe una reseña de hasta 5.000 caracteres.",
  USER_NOT_FOUND: "No hemos encontrado esta cuenta.",
  USERNAME_ALREADY_EXISTS: "Este nombre de usuario ya está registrado.",
  EMAIL_ALREADY_EXISTS: "Este correo electrónico ya está registrado.",
  INVALID_CREDENTIALS:
    "El correo, el usuario o la contraseña no son correctos.",
  INVALID_LOGIN_DATA: "Revisa los datos de acceso e inténtalo de nuevo.",
  INVALID_REGISTER_DATA: "Revisa los datos del registro e inténtalo de nuevo.",
  INVALID_TOKEN: "Tu sesión ha caducado. Vuelve a iniciar sesión.",
  UNAUTHORIZED: "Inicia sesión para continuar.",
  INVALID_QUERY_PARAMETER:
    "Revisa los términos de búsqueda e inténtalo de nuevo.",
  INVALID_SAVE_USERBOOK_DATA:
    "No se pudo guardar este libro. Vuelve a intentarlo.",
  USERBOOK_ALREADY_SAVED: "Ya tienes este libro en tu biblioteca.",
  INVALID_USERLIST_PARAMS:
    "No se pudo abrir esta lista. Vuelve a seleccionarla.",
  USERLIST_NOT_FOUND: "No hemos encontrado esta lista en tu biblioteca.",
  INVALID_USERBOOK_PARAMS: "No se pudo abrir este libro de tu biblioteca.",
  USERBOOK_NOT_FOUND: "No hemos encontrado este libro en tu biblioteca.",
  INVALID_UPDATE_USERBOOK_BODY:
    "No se pudo actualizar el libro. Revisa los datos e inténtalo de nuevo.",
  INVALID_GET_USERBOOKS_PARAMS:
    "No se pudo cargar esta selección. Prueba otros filtros.",
};

export const publicErrorMessage = (status: number, code: string): string => {
  if (status === 0)
    return "No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.";
  if (status >= 500)
    return "El servicio no está disponible temporalmente. Inténtalo de nuevo en unos instantes.";
  if (Object.hasOwn(messages, code)) return messages[code];
  switch (status) {
    case 401:
      return "Tu sesión ha caducado. Vuelve a iniciar sesión.";
    case 403:
      return "No tienes permiso para realizar esta acción.";
    case 404:
      return "Este contenido no está disponible en este momento.";
    case 400:
    case 422:
      return "Revisa los datos e inténtalo de nuevo.";
    case 409:
      return "No se pudo completar la acción. Actualiza la página e inténtalo de nuevo.";
    case 429:
      return "Has realizado demasiadas solicitudes. Espera un momento y vuelve a intentarlo.";
    default:
      return "No se pudo completar la operación. Vuelve a intentarlo.";
  }
};
