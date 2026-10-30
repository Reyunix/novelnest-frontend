export const getReturnTo = (value: string | null): string => {
  const fallback = "/mis-libros";
  if (
    !value?.startsWith("/") ||
    value.includes("\\") ||
    [...value].some((character) => character.charCodeAt(0) <= 32)
  )
    return fallback;
  try {
    const base = "https://novelnest.invalid";
    const url = new URL(value, base);
    return url.origin === base
      ? `${url.pathname}${url.search}${url.hash}`
      : fallback;
  } catch {
    return fallback;
  }
};
