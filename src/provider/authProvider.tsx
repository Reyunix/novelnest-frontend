import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthStatus } from "./authContext";

const PROTECTED_ENDPOINT = String(
  import.meta.env.VITE_API_PROTECTED_ENDPOINT ||
    `https://127.0.0.1:${String(import.meta.env.VITE_PORT)}/api/v1/users/protected`
);

const LOGOUT_ENDPOINT = String(
  import.meta.env.VITE_API_LOGOUT_ENDPOINT ||
    `https://127.0.0.1:${String(import.meta.env.VITE_PORT)}/api/v1/users/logout`
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch(PROTECTED_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });
      setAuthStatus(res.ok ? "authenticated" : "unauthenticated");
    } catch {
      setAuthStatus("unauthenticated");
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const res = await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include",
      });
      setAuthStatus("unauthenticated");
      return res.ok;
    } catch {
      setAuthStatus("unauthenticated");
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      authStatus,
      isAuthenticated: authStatus === "authenticated",
      refreshSession,
      logout,
    }),
    [authStatus, refreshSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
