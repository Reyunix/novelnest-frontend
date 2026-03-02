import { createContext, useContext } from "react";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
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

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};