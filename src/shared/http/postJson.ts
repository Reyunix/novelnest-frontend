export type ApiErrorResponse = {
  errorCode?: string;
  message?: string;
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const toApiErrorResponse = (payload: unknown): ApiErrorResponse | null => {
  if (!isObject(payload)) return null;

  const errorCode =
    typeof payload.errorCode === "string" ? payload.errorCode : undefined;
  const message = typeof payload.message === "string" ? payload.message : undefined;

  if (!errorCode && !message) return null;

  return { errorCode, message };
};

export const postJson = async (
  url: string,
  payload: unknown,
  credentials: RequestCredentials = "include",
): Promise<Response> => {
  return fetch(url, {
    method: "POST",
    credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const parseApiError = async (
  response: Response,
): Promise<ApiErrorResponse | null> => {
  try {
    const payload = (await response.json()) as unknown;
    return toApiErrorResponse(payload);
  } catch {
    return null;
  }
};
