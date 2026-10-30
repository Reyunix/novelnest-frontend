export const bookLink = (provider: string, providerBookId: string) =>
  `/libros/${encodeURIComponent(provider)}/${encodeURIComponent(providerBookId)}`;

export const isKnownAuthor = (author: string) => {
  const name = author.trim().toLocaleLowerCase();
  return (
    Boolean(name) &&
    !["autor desconocido", "unknown", "unknown author"].includes(name)
  );
};

export const searchOrigin = (value: unknown): string | null => {
  if (
    typeof value !== "string" ||
    value.includes("\\") ||
    [...value].some((char) => char.charCodeAt(0) < 32)
  )
    return null;
  try {
    const url = new URL(value, "https://novelnest.local");
    return value.startsWith("/") &&
      url.origin === "https://novelnest.local" &&
      url.pathname === "/buscar"
      ? `${url.pathname}${url.search}`
      : null;
  } catch {
    return null;
  }
};
