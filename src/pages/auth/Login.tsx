import { GenerateForm } from "../../components/GenerateForm";
import { LOGIN_FORM_FIELDS, LOGIN_FORM_LINKS } from "../../consts";
import { AUTH_ENDPOINTS } from "../../features/auth/auth.api";
import { useAuth } from "../../features/auth/authContext";
import type { LoginForm } from "../../schemas/loginFormSchema";

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
