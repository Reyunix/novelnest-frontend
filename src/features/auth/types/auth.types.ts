export type AuthStatus =
  "loading" | "authenticated" | "unauthenticated" | "error";
export type User = {
  userId?: number;
  userName?: string;
  userEmail?: string;
  role?: string;
} | null;

export interface AuthContextValue {
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  user: User;
  refreshSession: () => Promise<void>;
  logout: () => Promise<boolean>;
}
