import { GenerateForm } from "../../components/GenerateForm";
import { AUTH_ENDPOINTS, LOGIN_FORM_FIELDS, LOGIN_FORM_LINKS } from "../../features/auth/constants/auth.constants";
import { useAuth } from "../../features/auth/authContext";
import type { LoginForm } from "../../features/auth/schemas/login.form.schemas";

export const Login: React.FC = () => {
  const { refreshSession } = useAuth();

  return (
    <GenerateForm
      apiEndpoint={AUTH_ENDPOINTS.LOGIN}
      formFieldsList={LOGIN_FORM_FIELDS}
      formLinks={LOGIN_FORM_LINKS}
      buttonLiteral="Iniciar Sesión"
      title="¡Hola de nuevo! ¡Nos alegramos mucho de volver a verte!"
      formSchemaType="login"
      redirectOnSuccess="/"
      payloadTransformer={(data: LoginForm) => {
        const isEmail = data.userName?.includes("@");
        return isEmail
          ? { userEmail: data.userName, userPassword: data.userPassword }
          : { userName: data.userName, userPassword: data.userPassword };
      }}
      onSuccess={async () => {
        await refreshSession();
      }}
    />
  );
};
