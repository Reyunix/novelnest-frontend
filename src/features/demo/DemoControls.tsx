import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { useDemo } from "./demoContext";

export const DemoStartButton = ({
  label = "Probar sin registrarme",
}: {
  label?: string;
}) => {
  const { isAuthenticated } = useAuth();
  const { store, active } = useDemo();
  const navigate = useNavigate();
  if (isAuthenticated) return null;
  return (
    <button
      type="button"
      className="button button-secondary"
      onClick={() => {
        store.enter();
        navigate("/mis-libros");
      }}
    >
      {active ? "Continuar demo" : label}
    </button>
  );
};
export const DemoBanner = () => {
  const { active, persistent, store } = useDemo();
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  if (!active) return null;
  return (
    <aside className="demo-banner" aria-label="Modo invitado">
      <div>
        <strong>Modo invitado · demo del portfolio</strong>
        <p>
          Estás probando una demo. Tus cambios se guardan solo en este
          navegador.
        </p>
        {!persistent && (
          <p role="status">
            El almacenamiento no está disponible: los cambios se perderán al
            recargar.
          </p>
        )}
      </div>
      <div className="inline-actions">
        <button className="text-button" onClick={() => setConfirm(true)}>
          Reiniciar demo
        </button>
        <button
          className="text-button"
          onClick={() => {
            store.leave();
            navigate("/inicio");
          }}
        >
          Salir del modo invitado
        </button>
      </div>
      {confirm && (
        <div className="demo-confirmation">
          <p>
            ¿Borrar tus cambios de prueba y recuperar los ejemplos iniciales?
          </p>
          <div className="inline-actions">
            <button
              className="button button-danger"
              onClick={() => {
                store.reset();
                setConfirm(false);
              }}
            >
              Sí, reiniciar demo
            </button>
            <button
              className="button button-secondary"
              onClick={() => setConfirm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
