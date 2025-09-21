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
  {id: 0, literal: "Condiciones del Servicio", href: "/"},
  {id: 1, literal: "Pólitica de Privacidad", href: "/"},
  {id: 2, literal: "¿Ya tienes una cuenta? Inicia sesión", href: "/"}
]

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
  }
];
