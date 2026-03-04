import { AUTH_ENDPOINTS } from "./constants/auth.constants";

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
  return fetch(AUTH_ENDPOINTS.ME, {
    method: "GET",
    credentials: "include",
  });
};

export const refreshAccessToken = async (): Promise<Response> => {
  return fetch(AUTH_ENDPOINTS.REFRESH, {
    method: "POST",
    credentials: "include",
  });
}

export const logoutSession = async (): Promise<Response> => {
  return fetch(AUTH_ENDPOINTS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
};

