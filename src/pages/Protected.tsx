import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authContext";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { authStatus, refreshSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      navigate("/login", { replace: true });
    }
  }, [authStatus, navigate]);

  if (authStatus === "loading") {
    return <div>Cargando...</div>;
  }

  if (authStatus === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
};
