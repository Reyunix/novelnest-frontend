export const HEADER_MENU_LINKS = [
  { id: 0, literal: "Inicio", href: "/inicio" },
  { id: 2, literal: "Buscar", href: "/buscar" },
  { id: 1, literal: "Contacto", href: "/contact" },
];

export const HEADER_MENU_LOGGED_LINKS = [
  { id: 100, literal: "Mi Colección", href: "/mis-libros" },
  { id: 101, literal: "Cerrar sesión", href: "/logout" },
];

export const HEADER_MENU_UNLOGGED_LINKS = [
  { id: 200, literal: "Iniciar sesión", href: "/login" },
  { id: 201, literal: "Registrarse", href: "/register" },
];

export const FOOTER_MENU_LINKS = {
  legal: [
    { id: 1, literal: "Términos", href: "/" },
    { id: 2, literal: "Privacidad", href: "/" },
  ],
  company: [
    { id: 0, literal: "Contacto", href: "/contact" },
    { id: 1, literal: "Sobre mí", href: "/about" },
    { id: 2, literal: "Blog", href: "/blog" },
  ],
  social: [
    { id: 0, literal: "GitHub", href: "https://github.com/Reyunix" },
    { id: 1, literal: "LinkedIn", href: "https://www.linkedin.com/in/franurzualopez/" },
  ],
};
