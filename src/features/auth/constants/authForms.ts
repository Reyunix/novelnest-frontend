import type { FormLink } from "../../../types/interfaces";

export const REGISTER_FORM_LINKS: FormLink[] = [
  { id: 0, literal: "Condiciones del Servicio", href: "/" },
  { id: 1, literal: "Pólitica de Privacidad", href: "/" },
  { id: 2, literal: "¿Ya tienes una cuenta? Inicia sesión", href: "/login" },
];

export const REGISTER_FORM_FIELDS = [
  {
    id: "userEmail",
    literal: "Correo electrónico",
    required: true,
    inputType: "email",
    autofocus: true,
  },
  {
    id: "userName",
    literal: "Nombre de usuario",
    required: true,
    inputType: "text",
  },
  {
    id: "userPassword",
    literal: "Contraseña",
    required: true,
    inputType: "password",
  },
  {
    id: "confirmPassword",
    literal: "Repetir contraseña",
    required: true,
    inputType: "password",
  },
  {
    id: "userAddress",
    literal: "Dirección",
    required: false,
    inputType: "text",
  },
];

export const LOGIN_FORM_LINKS: FormLink[] = [
  {
    id: 0,
    literal: "¿Has olvidado tu contraseña?",
    href: "/",
    customPosition: true,
    fieldPosition: "userPassword",
  },
  { id: 1, literal: "¿No tienes una cuenta? Registrarse", href: "/register" },
];

export const LOGIN_FORM_FIELDS = [
  {
    id: "userName",
    literal: "Nombre de usuario o Correo",
    required: true,
    inputType: "text",
    autofocus: true,
  },
  {
    id: "userPassword",
    literal: "Contraseña",
    required: true,
    inputType: "password",
  },
];
