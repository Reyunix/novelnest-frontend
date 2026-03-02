import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/authContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authStatus, refreshSession } = useAuth();

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  if (authStatus === "loading") {
    return <div>Cargando...</div>;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
