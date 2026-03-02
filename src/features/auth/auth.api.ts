import { API_ENDPOINTS } from "../../consts";

export const AUTH_ENDPOINTS = {
  REGISTER: API_ENDPOINTS.REGISTER,
  LOGIN: API_ENDPOINTS.LOGIN,
  LOGOUT: API_ENDPOINTS.LOGOUT,
  ME: API_ENDPOINTS.ME,
} as const;

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

export const logoutSession = async (): Promise<Response> => {
  return fetch(AUTH_ENDPOINTS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
};
