import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/authContext";

export const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const closeSession = async () => {
      try {
        await logout();
      } finally {
        setIsLoggingOut(false);
        navigate("/login", { replace: true });
      }
    };
    void closeSession();
  }, [logout, navigate]);

  if (isLoggingOut) {
    return <div>Cerrando sesión...</div>;
  }

  return null;
};
