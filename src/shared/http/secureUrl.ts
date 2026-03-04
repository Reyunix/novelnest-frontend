export const toSecureUrl = (url?: string | null) =>
    url?.startsWith("http:") ? url.replace(/^http:/, "https:") : url;