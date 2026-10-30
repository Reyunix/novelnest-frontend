import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/FormField";
import {
  RegisterFormSchema,
  type RegisterForm,
} from "../../features/auth/schemas/register.form.schemas";
import { postJson } from "../../shared/http/postJson";
import { errorMessage } from "../../shared/http/request";
import { AppHttpError } from "../../shared/types/httpError.types";
import { API_ENDPOINTS } from "../../shared/config/config.api";
import { useNotifications } from "../../features/notifications/notificationContext";

export const Register = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { showNotification } = useNotifications();
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(RegisterFormSchema) });
  useEffect(() => {
    setFocus("userEmail");
  }, [setFocus]);
  const submit = async (values: RegisterForm) => {
    try {
      await postJson(API_ENDPOINTS.REGISTER, values);
      showNotification("Cuenta creada. Ya puedes iniciar sesión.", "success");
      navigate(`/login?${params}`, { replace: true });
    } catch (error) {
      const field =
        error instanceof AppHttpError &&
        error.errorCode === "USERNAME_ALREADY_EXISTS"
          ? "userName"
          : error instanceof AppHttpError &&
              error.errorCode === "EMAIL_ALREADY_EXISTS"
            ? "userEmail"
            : "root";
      setError(field, { message: errorMessage(error) });
    }
  };
  return (
    <div className="center">
      <section className="form-layout">
        <header className="form-header">
          <p className="eyebrow">Haz sitio para tus historias</p>
          <h1 className="form-h1">Crea tu biblioteca</h1>
        </header>
        <form className="form" onSubmit={handleSubmit(submit)}>
          {errors.root && (
            <p className="error-message" role="alert">
              {errors.root.message}
            </p>
          )}
          <FormField
            label="Correo electrónico"
            registration={register("userEmail")}
            error={errors.userEmail}
            type="email"
            autoComplete="email"
          />
          <FormField
            label="Nombre de usuario"
            registration={register("userName")}
            error={errors.userName}
            autoComplete="username"
          />
          <FormField
            label="Contraseña"
            registration={register("userPassword")}
            error={errors.userPassword}
            type={visible ? "text" : "password"}
            autoComplete="new-password"
          />
          <p className="book-meta">
            Usa al menos 8 caracteres, una mayúscula, un número y un símbolo.
          </p>
          <FormField
            label="Repite la contraseña"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
            type={visible ? "text" : "password"}
            autoComplete="new-password"
          />
          <button
            className="text-button"
            type="button"
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? "Ocultar contraseñas" : "Mostrar contraseñas"}
          </button>
          <footer className="form-footer">
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
            </button>
            <Link className="links" to={`/login?${params}`}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </footer>
        </form>
      </section>
    </div>
  );
};
