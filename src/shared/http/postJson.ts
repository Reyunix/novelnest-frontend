import { AppHttpError } from "../types/httpError.types";

type ApiErrorPayload = {
  errorCode?: string;
  message?: string;
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const toApiErrorPayload = (value: unknown): ApiErrorPayload | null => {
  if (!isObject(value)) return null;

  const errorCode =
    typeof value.errorCode === "string" ? value.errorCode : undefined;
  const message = typeof value.message === "string" ? value.message : undefined;

  if (!errorCode && !message) return null;

  return { errorCode, message };
};

const parseJsonSafely = async (response: Response): Promise<unknown | null> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
};

const setHeaders = (header: HeadersInit | undefined) => {
  const headers = new Headers(header);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers
};

export const postJson = async <T>(
  url: string | URL,
  body: unknown,
  requestInit?: RequestInit,
): Promise<T> => {
  const requestUrl = url instanceof URL ? url.toString() : url;

  try {
    const headers = setHeaders(requestInit?.headers);
    const response = await fetch(requestUrl, {
      ...requestInit,
      method: "POST",
      credentials: requestInit?.credentials ?? "include",
      headers,
      body: JSON.stringify(body),
    });

    const rawPayload = await parseJsonSafely(response);

    if (!response.ok) {
      const apiError = toApiErrorPayload(rawPayload);

      throw new AppHttpError({
        status: response.status,
        errorCode: apiError?.errorCode ?? "UNKNOWN_ERROR",
        message: apiError?.message ?? `Request failed (${response.status})`,
        url: requestUrl,
        method: "POST",
      });
    }

    if (rawPayload === null) {
      throw new AppHttpError({
        status: response.status,
        errorCode: "PARSE_ERROR",
        message: "Response payload is not valid JSON",
        url: requestUrl,
        method: "POST",
      });
    }

    return rawPayload as T;
  } catch (error) {
    if (error instanceof AppHttpError) throw error;

    throw new AppHttpError({
      status: 0,
      errorCode: "NETWORK_ERROR",
      message: "No se pudo conectar con el servidor",
      cause: error,
      method: "POST",
      url: requestUrl,
    });
  }
};
