import { REGISTER_FORM_FIELDS, REGISTER_FORM_LINKS } from "../consts";
import { GenerateForm } from "../components/GenerateForm";

export const Register = () => {
  const API_REGISTER_EP = String(import.meta.env.VITE_API_REGISTER_ENDPOINT);

  return (
    <GenerateForm
      formFieldsList={REGISTER_FORM_FIELDS}
      apiEndpoint={API_REGISTER_EP}
      formLinks={REGISTER_FORM_LINKS}
      title="Crear cuenta"
      buttonLiteral="Crear cuenta"
      formSchemaType="register"
    />
  );
};
