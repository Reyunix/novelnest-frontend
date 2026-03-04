import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentSession,
  logoutSession,
  refreshAccessToken,
  type ProtectedSessionResponse,
} from "./auth.api";
import {
  type AuthContextValue,
  type AuthStatus,
  type User,
} from "./types/auth.types";
import { AuthContext } from "./authContext";

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
      let res = await getCurrentSession();

      if (res.status === 401) {
        const refreshRes = await refreshAccessToken();
        if (!refreshRes.ok) {
          setAuthStatus("unauthenticated");
          setUser(null);
          return;
        }
        res = await getCurrentSession();
      }

      if (!res.ok) {
        setAuthStatus("unauthenticated");
        setUser(null);
        return;
      }

      const payload = (await res.json()) as ProtectedSessionResponse;
      
      const user = setUser(toUser(payload));
      if (user !== null) {setAuthStatus("authenticated")}
      
      else{
        throw new Error
      };
    } catch {
      setAuthStatus("unauthenticated");
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const res = await logoutSession();
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
    void initializeSession();
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
