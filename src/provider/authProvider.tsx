import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthContextValue, type AuthStatus, type User } from "./authContext";
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
    console.log(ME_ENDPOINT, "Refreshing session...");
    try {
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

  // On mount, check if there's an active session
  useEffect(() => {
    // inline async function to avoid linting warnings
    const initializeSession = async () => {
      await refreshSession();
    };
    initializeSession();
  }, [refreshSession]);

  const value: AuthContextValue = useMemo(
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
