import { GenerateForm } from "../components/GenerateForm";
import { LOGIN_FORM_FIELDS, LOGIN_FORM_LINKS } from "../consts";

export const Login:React.FC = () => {
  const API_LOGIN_EP = String(import.meta.env.VITE_API_LOGIN_ENDPOINT)
  return (
    <GenerateForm
    apiEndpoint={API_LOGIN_EP}
    formFieldsList={LOGIN_FORM_FIELDS}
    formLinks={LOGIN_FORM_LINKS}
    buttonLiteral="Iniciar Sesión"
    title="¡Hola de nuevo! ¡Nos alegramos mucho de volver a verte!"    
    formSchemaType="login"
    />
  );
};
