const setHeaders = (header: HeadersInit | undefined) => {
  const headers = new Headers(header);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
};

export const patchJson = async <TData>(
  url: string | URL,
  body: unknown,
  parseResponse: (response: Response) => Promise<TData>,
  requestInit?: RequestInit,
) => {
  const requestUrl = url instanceof URL ? url.toString() : url;
  const headers = setHeaders(requestInit?.headers);

  try {
    const response = await fetch(requestUrl, {
      method: "PATCH",
      ...requestInit,
      body: JSON.stringify(body),
      headers,
      credentials: requestInit?.credentials ?? "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }
    const parsed = await parseResponse(response);

    return parsed;
  } catch {
    return;
  }
};
