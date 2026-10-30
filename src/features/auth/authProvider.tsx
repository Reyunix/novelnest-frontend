import { onSessionExpired } from "../../shared/http/sessionToken";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User>(null);
  const inFlight = useRef<Promise<void> | null>(null);
  const generation = useRef(0);
  const refreshSession = useCallback((): Promise<void> => {
    if (inFlight.current) return inFlight.current;
    const version = generation.current;
    const run = async () => {
      try {
        let response = await getCurrentSession();
        if (response.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed.status === 401 || refreshed.status === 403) {
            if (version === generation.current) {
              setUser(null);
              setAuthStatus("unauthenticated");
            }
            return;
          }
          if (!refreshed.ok) throw new Error("Session unavailable");
          response = await getCurrentSession();
        }
        if (version !== generation.current) return;
        if (response.status === 401) {
          setUser(null);
          setAuthStatus("unauthenticated");
          return;
        }
        if (!response.ok) throw new Error("Session unavailable");
        const payload = (await response.json()) as ProtectedSessionResponse;
        if (version !== generation.current) return;
        const nextUser = payload.data?.user;
        if (!nextUser?.userId) throw new Error("Invalid session");
        setUser(nextUser);
        setAuthStatus("authenticated");
      } catch {
        if (version === generation.current) setAuthStatus("error");
      }
    };
    const pending = run();
    inFlight.current = pending;
    void pending.finally(() => {
      if (inFlight.current === pending) inFlight.current = null;
    });
    return pending;
  }, []);
  const logout = useCallback(async () => {
    const response = await logoutSession();
    if (!response.ok) return false;
    ++generation.current;
    inFlight.current = null;
    setUser(null);
    setAuthStatus("unauthenticated");
    return true;
  }, []);
  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);
  useEffect(
    () =>
      onSessionExpired(() => {
        ++generation.current;
        inFlight.current = null;
        setUser(null);
        setAuthStatus("unauthenticated");
      }),
    [],
  );
  const value = useMemo<AuthContextValue>(
    () => ({
      authStatus,
      isAuthenticated: authStatus === "authenticated",
      user,
      refreshSession,
      logout,
    }),
    [authStatus, user, refreshSession, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
