import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthStatus, type User } from "./authContext";

const PROTECTED_ENDPOINT = String(
  import.meta.env.VITE_API_PROTECTED_ENDPOINT ||
    `https://127.0.0.1:${String(import.meta.env.VITE_PORT)}/api/v1/users/protected`,
);

const LOGOUT_ENDPOINT = String(
  import.meta.env.VITE_API_LOGOUT_ENDPOINT ||
    `https://127.0.0.1:${String(import.meta.env.VITE_PORT)}/api/v1/users/logout`,
);

type ProtectedSessionResponse = {
  data?: {
    user?: {
      userId?: number;
      userName?: string;
      userEmail?: string;
      role?: string;
    };
  };
};

const toUser = (payload: ProtectedSessionResponse): User => {
  const sessionUser = payload.data?.user;
  if (!sessionUser) return null;

  return {
    userId: sessionUser.userId,
    userName: sessionUser.userName,
    userEmail: sessionUser.userEmail,
    role: sessionUser.role,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User>(null);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch(PROTECTED_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setAuthStatus("unauthenticated");
        setUser(null);
        return;
      }

      const payload = (await res.json()) as ProtectedSessionResponse;
      setAuthStatus("authenticated");
      setUser(toUser(payload));
    } catch {
      setAuthStatus("unauthenticated");
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const res = await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include",
      });
      setAuthStatus("unauthenticated");
      setUser(null);
      return res.ok;
    } catch {
      setAuthStatus("unauthenticated");
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInitialSession = async () => {
      try {
        const res = await fetch(PROTECTED_ENDPOINT, {
          method: "GET",
          credentials: "include",
        });

        if (!isMounted) return;

        if (!res.ok) {
          setAuthStatus("unauthenticated");
          setUser(null);
          return;
        }

        const payload = (await res.json()) as ProtectedSessionResponse;
        setAuthStatus("authenticated");
        setUser(toUser(payload));
      } catch {
        if (isMounted) {
          setAuthStatus("unauthenticated");
          setUser(null);
        }
      }
    };

    void loadInitialSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      authStatus,
      isAuthenticated: authStatus === "authenticated",
      refreshSession,
      logout,
      user,
    }),
    [authStatus, refreshSession, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
