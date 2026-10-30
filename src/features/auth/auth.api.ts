import { refreshSessionToken } from "../../shared/http/sessionToken";
import { API_ENDPOINTS } from "../../shared/config/config.api";

export type ProtectedSessionResponse = {
  data?: {
    user?: {
      userId?: number;
      userName?: string;
      userEmail?: string;
      role?: string;
    };
  };
};

export const getCurrentSession = async (): Promise<Response> => {
  return fetch(API_ENDPOINTS.ME, {
    method: "GET",
    credentials: "include",
  });
};

export const refreshAccessToken = refreshSessionToken;

export const logoutSession = async (): Promise<Response> => {
  return fetch(API_ENDPOINTS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
};
