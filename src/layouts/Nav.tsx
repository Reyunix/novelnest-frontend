import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HEADER_MENU_LINKS,
  HEADER_MENU_LOGGED_LINKS,
  HEADER_MENU_UNLOGGED_LINKS,
} from "../shared/constants/navigation.constants";
import { useAuth } from "../features/auth/authContext";
import { UserGreetings } from "../components/UserGreetings";

export const Nav: React.FC = () => {
  const { authStatus, user } = useAuth();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === "/inicio" || pathname === "/";

  const authLinks =
    authStatus === "authenticated"
      ? HEADER_MENU_LOGGED_LINKS
      : HEADER_MENU_UNLOGGED_LINKS;

  const menuLinks =
    authStatus === "loading"
      ? HEADER_MENU_LINKS
      : [...HEADER_MENU_LINKS, ...authLinks];

  const userName = user?.userName;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        type="button"
        className="header-menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="header-menu-toggle-bar"></span>
        <span className="header-menu-toggle-bar"></span>
        <span className="header-menu-toggle-bar"></span>
      </button>

      <nav
        id="main-navigation"
        className={isMenuOpen ? "header-nav header-nav--open" : "header-nav"}
      >
      <ul className="header-menu">
        {menuLinks.map((link) => {
          return (
            <li key={link.id} className="header-menu-item">
              <NavLink to={link.href}> {link.literal} </NavLink>
            </li>
          );
        })}
        {authStatus === "authenticated" && isHome && (
          <li className="header-menu-item header-menu-greeting">
            <UserGreetings userName={userName} />
          </li>
        )}
        {authStatus === "loading" && (
          <li className="header-menu-item">Comprobando sesión...</li>
        )}
      </ul>
      </nav>
    </>
  );
};
