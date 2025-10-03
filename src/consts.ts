import type { FormLink } from "./types/interfaces";

export const HEADER_MENU_LINKS = [
  { id: 0, literal: "Inicio", href: "/inicio" },
  { id: 1, literal: "Mi Colección", href: "/" },
  { id: 2, literal: "Contacto", href: "/" },
  { id: 3, literal: "Iniciar Sesión", href: "/login" },
  { id: 4, literal: "Buscar", href: "/buscar" },
];

export const FOOTER_MENU_LINKS = [
  { id: 0, literal: "Contacto", href: "/" },
  { id: 1, literal: "Términos y Condiciones", href: "/" },
  { id: 2, literal: "Políticas de Privacidad", href: "/" },
];

export const REGISTER_FORM_LINKS = [
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
    autofocus: false,
  },
  {
    id: "userPassword",
    literal: "Contraseña",
    required: true,
    inputType: "password",
    autofocus: false,
  },
  {
    id: "confirmPassword",
    literal: "Repetir contraseña",
    required: true,
    inputType: "password",
    autofocus: false,
  },
  {
    id: "userAddress",
    literal: "Dirección",
    required: false,
    inputType: "text",
    autofocus: false,
  },
]

export const LOGIN_FORM_LINKS: FormLink[] = [
  {
    id: 0,
    literal: "¿Has olvidado tu contraseña?",
    href: "/",
    customPosition: true,
    fieldPosition: "userPassword",
  },
  { id: 1, literal: "¿No tienes una cuenta? Registrarse", href: "/register" },
]

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
    autofocus: false,
  },
]

export const FORM_ERRORMAP = {
  USERNAME_ALREADY_EXISTS: "userName",
  EMAIL_ALREADY_EXISTS: "userEmail",
  INVALID_CREDENTIALS: "userName",
} as const;

// export type RegisterFormErrors =
//   (typeof FORM_ERRORMAP)[keyof typeof FORM_ERRORMAP];
