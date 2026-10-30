import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/authContext";
import { FeedbackState } from "../../components/FeedbackState";

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    void logout()
      .then((ok) => {
        if (!active) return;
        if (ok) navigate("/login", { replace: true });
        else setFailed(true);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [logout, navigate]);
  return (
    <FeedbackState
      title={failed ? "No se pudo cerrar la sesión" : "Cerrando sesión…"}
    >
      {failed && (
        <>
          <p>Comprueba la conexión e inténtalo de nuevo.</p>
          <button
            className="button button-secondary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </>
      )}
    </FeedbackState>
  );
};
