import { NavLink } from "react-router-dom";
import { HEADER_MENU_LINKS } from "../consts";
import { useAuth } from "../provider/authContext";
import { UserGreetings } from "../components/UserGreetings";

export const Nav:React.FC = () => {
  const { authStatus, user } = useAuth();

  const authLinks =
    authStatus === "authenticated"
      ? [
          { id: 100, literal: "Mi Colección", href: "/mis-libros" },
          { id: 101, literal: "Cerrar sesión", href: "/logout" },
        ]
      : [
          { id: 200, literal: "Iniciar sesión", href: "/login" },
          { id: 201, literal: "Registrarse", href: "/register" },
        ];

  const menuLinks =
    authStatus === "loading"
      ? HEADER_MENU_LINKS
      : [...HEADER_MENU_LINKS, ...authLinks];

  const userName = user?.userName || "Usuario";

  return (
    <nav className="header-nav">
      <ul className="header-menu">
        {menuLinks.map((link) => {
          return (
            <li key={link.id} className="header-menu-item">
              <NavLink to={link.href}> {link.literal} </NavLink>
            </li>
          );
        })}
        {authStatus === "authenticated" && <UserGreetings userName={userName} />}
        {authStatus === "loading" && (
          <li className="header-menu-item">Comprobando sesión...</li>
        )}
      </ul>
    </nav>
  );
};
