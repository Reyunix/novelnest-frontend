export const deleteJson = async (
  url: string | URL,
  requestInit?: RequestInit,
): Promise<Response> => {
  const requestUrl = url instanceof URL ? url.toString() : url;

  return await fetch(requestUrl, {
    ...requestInit,
    credentials: requestInit?.credentials ?? "include",
    method: "DELETE",
  });
};

