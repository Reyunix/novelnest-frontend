import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h2>
        <NavLink className="header-logo" to="/inicio">Novelnest</NavLink>
      </h2>
      <Nav />
    </header>
  );
};
