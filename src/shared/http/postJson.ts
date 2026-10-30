import { jsonHeaders, request } from "./request";

export const postJson = async <T>(
  url: string | URL,
  body: unknown,
  init?: RequestInit,
): Promise<T> => {
  const response = await request(url, {
    ...init,
    method: "POST",
    headers: jsonHeaders(init?.headers),
    body: JSON.stringify(body),
  });
  return (await response.json()) as T;
};
