import { jsonHeaders, request } from "./request";

export const patchJson = async <T>(
  url: string | URL,
  body: unknown,
  parseResponse: (response: Response) => Promise<T>,
  init?: RequestInit,
): Promise<T> => {
  const response = await request(url, {
    ...init,
    method: "PATCH",
    headers: jsonHeaders(init?.headers),
    body: JSON.stringify(body),
  });
  return parseResponse(response);
};
