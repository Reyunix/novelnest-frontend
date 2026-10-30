import { publicErrorMessage } from "./publicErrorMessage";
import { refreshSessionToken, reportSessionExpired } from "./sessionToken";
import { API_ENDPOINTS } from "../config/config.api";
import { AppHttpError } from "../types/httpError.types";

export const request = async (
  url: string | URL,
  init: RequestInit = {},
): Promise<Response> => {
  const method = init.method ?? "GET";
  const target = new URL(url);
  const booksBase = new URL(API_ENDPOINTS.BOOKS);
  const protectedRequest =
    String(url).startsWith(API_ENDPOINTS.USER_BOOKS) ||
    (target.origin === booksBase.origin &&
      target.pathname.startsWith(`${booksBase.pathname}/`) &&
      target.pathname.endsWith("/reviews/me"));
  let response: Response;
  try {
    response = await fetch(url, { credentials: "include", ...init });
    if (response.status === 401 && protectedRequest) {
      const refreshed = await refreshSessionToken();
      if (refreshed.ok)
        response = await fetch(url, { credentials: "include", ...init });
      else if (refreshed.status !== 401 && refreshed.status !== 403)
        response = refreshed;
    }
  } catch (cause) {
    if (init.signal?.aborted) throw cause;
    throw new AppHttpError({
      status: 0,
      errorCode: "NETWORK_ERROR",
      message:
        "No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.",
      cause,
      url: String(url),
      method,
    });
  }
  if (!response.ok) {
    if (response.status === 401 && protectedRequest) reportSessionExpired();
    const payload: unknown = await response.json().catch(() => null);
    const error =
      payload && typeof payload === "object"
        ? (payload as Record<string, unknown>)
        : {};
    const errorCode =
      typeof error.errorCode === "string" ? error.errorCode : "HTTP_ERROR";
    throw new AppHttpError({
      status: response.status,
      errorCode,
      message: publicErrorMessage(response.status, errorCode),
      url: String(url),
      method,
    });
  }
  return response;
};

export const jsonHeaders = (existing?: HeadersInit) => {
  const headers = new Headers(existing);
  headers.set("Content-Type", "application/json");
  return headers;
};

export const errorMessage = (error: unknown) =>
  error instanceof AppHttpError
    ? publicErrorMessage(error.status, error.errorCode)
    : "No se pudo completar la operación. Vuelve a intentarlo.";
