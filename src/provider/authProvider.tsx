import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthStatus, type User } from "./authContext";
import { API_ENDPOINTS } from "../consts";

const ME_ENDPOINT = API_ENDPOINTS.ME;
const LOGOUT_ENDPOINT = API_ENDPOINTS.LOGOUT;

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
      console.log(ME_ENDPOINT);
      const res = await fetch(ME_ENDPOINT, {
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
        console.log(ME_ENDPOINT);
        const res = await fetch(ME_ENDPOINT, {
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
