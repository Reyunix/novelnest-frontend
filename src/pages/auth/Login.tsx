import { getReturnTo } from "../../features/auth/returnTo";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../components/FormField";
import { useAuth } from "../../features/auth/authContext";
import {
  LoginFormSchema,
  type LoginForm,
} from "../../features/auth/schemas/login.form.schemas";
import { postJson } from "../../shared/http/postJson";
import { errorMessage } from "../../shared/http/request";
import { API_ENDPOINTS } from "../../shared/config/config.api";

export const Login = () => {
  const { refreshSession } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const destination = getReturnTo(params.get("returnTo"));
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginFormSchema) });
  useEffect(() => {
    setFocus("userName");
  }, [setFocus]);
  const submit = async (values: LoginForm) => {
    try {
      const identifier = values.userName.trim();
      await postJson(API_ENDPOINTS.LOGIN, {
        ...(identifier.includes("@")
          ? { userEmail: identifier }
          : { userName: identifier }),
        userPassword: values.userPassword,
      });
      await refreshSession();
      navigate(destination, { replace: true });
    } catch (error) {
      setError("root", { message: errorMessage(error) });
    }
  };
  return (
    <div className="center">
      <section className="form-layout">
        <header className="form-header">
          <p className="eyebrow">Tu biblioteca te espera</p>
          <h1 className="form-h1">Vuelve a tus lecturas</h1>
        </header>
        <form className="form" onSubmit={handleSubmit(submit)}>
          {errors.root && (
            <p className="error-message" role="alert">
              {errors.root.message}
            </p>
          )}
          <FormField
            label="Nombre de usuario o correo"
            registration={register("userName")}
            error={errors.userName}
            autoComplete="username"
          />
          <FormField
            label="Contraseña"
            registration={register("userPassword")}
            error={errors.userPassword}
            type={visible ? "text" : "password"}
            autoComplete="current-password"
          />
          <button
            className="text-button"
            type="button"
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          </button>
          <footer className="form-footer">
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesión…" : "Iniciar sesión"}
            </button>
            <Link className="links" to={`/register?${params}`}>
              ¿No tienes una cuenta? Crea tu biblioteca
            </Link>
          </footer>
        </form>
      </section>
    </div>
  );
};
