import { API_ENDPOINTS } from "../config/config.api";
let refreshInFlight: Promise<Response> | null = null;
export const refreshSessionToken = (): Promise<Response> => {
  if (!refreshInFlight) {
    refreshInFlight = fetch(API_ENDPOINTS.REFRESH, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};

const expirationListeners = new Set<() => void>();
export const onSessionExpired = (listener: () => void) => {
  expirationListeners.add(listener);
  return () => {
    expirationListeners.delete(listener);
  };
};
export const reportSessionExpired = () => {
  expirationListeners.forEach((listener) => listener());
};
