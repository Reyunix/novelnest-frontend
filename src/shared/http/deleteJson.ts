import { request } from "./request";

export const deleteJson = (
  url: string | URL,
  init?: RequestInit,
): Promise<Response> => request(url, { ...init, method: "DELETE" });
