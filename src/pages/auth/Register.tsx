import { GenerateForm } from "../../components/GenerateForm";
import { AUTH_ENDPOINTS, REGISTER_FORM_FIELDS, REGISTER_FORM_LINKS } from "../../features/auth/constants/auth.constants";
import type { RegisterForm } from "../../features/auth/schemas/register.form.schemas";

export const Register = () => {
  return (
    <GenerateForm
      formFieldsList={REGISTER_FORM_FIELDS}
      apiEndpoint={AUTH_ENDPOINTS.REGISTER}
      formLinks={REGISTER_FORM_LINKS}
      title="Crear cuenta"
      buttonLiteral="Crear cuenta"
      formSchemaType="register"
      redirectOnSuccess="/login"
      payloadTransformer={(data: RegisterForm) => {
        return {
          userName: data.userName,
          userPassword: data.userPassword,
          confirmPassword: data.confirmPassword,
          userEmail: data.userEmail,
          userAddress: data.userAddress,
        };
      }}
    />
  );
};
