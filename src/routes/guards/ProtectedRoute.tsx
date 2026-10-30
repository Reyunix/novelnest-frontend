import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/authContext";
import { FeedbackState } from "../../components/FeedbackState";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authStatus, refreshSession } = useAuth();
  const location = useLocation();
  if (authStatus === "loading")
    return <FeedbackState title="Comprobando tu sesión…" />;
  if (authStatus === "error")
    return (
      <FeedbackState title="No hemos podido comprobar tu sesión" error>
        <p>
          El servidor no está disponible. Puedes volver a intentarlo sin cerrar
          tu sesión.
        </p>
        <button
          className="button button-secondary"
          onClick={() => void refreshSession()}
        >
          Reintentar
        </button>
      </FeedbackState>
    );
  if (authStatus === "unauthenticated")
    return (
      <Navigate
        to={`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  return <>{children}</>;
};
