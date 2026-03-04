import { NavLink } from "react-router-dom";
import { HEADER_MENU_LINKS, HEADER_MENU_LOGGED_LINKS, HEADER_MENU_UNLOGGED_LINKS } from "../shared/constants/navigation.constants";
import { useAuth } from "../features/auth/authContext";
import { UserGreetings } from "../components/UserGreetings";

export const Nav:React.FC = () => {
  const { authStatus, user } = useAuth();

  const authLinks =
    authStatus === "authenticated"
      ? HEADER_MENU_LOGGED_LINKS
      : HEADER_MENU_UNLOGGED_LINKS;

  const menuLinks =
    authStatus === "loading"
      ? HEADER_MENU_LINKS
      : [...HEADER_MENU_LINKS, ...authLinks];

  const userName = user?.userName

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
