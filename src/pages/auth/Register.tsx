import { GenerateForm } from "../../components/GenerateForm";
import { REGISTER_FORM_FIELDS, REGISTER_FORM_LINKS } from "../../consts";
import { AUTH_ENDPOINTS } from "../../features/auth/auth.api";
import type { RegisterForm } from "../../schemas/registerFormSchema";

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
