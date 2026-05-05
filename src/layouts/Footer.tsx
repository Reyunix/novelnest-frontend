import { FOOTER_MENU_LINKS } from "../shared/constants/navigation.constants";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <div className="footer-menu-company-wrap">
          <h3>Empresa</h3>
          <ul className="footer-menu-company">
          {FOOTER_MENU_LINKS.company.map((link) => {
            return (
              <li key={link.id} className="footer-menu-company-item">
                <Link rel="noopener noreferrer" to={link.href}> {link.literal} </Link>
              </li>
            );
          })}
        </ul>
        </div>
        <div className="footer-menu-social-wrap">
          <h3>Conecta</h3>
          <ul className="footer-menu-social">
          {FOOTER_MENU_LINKS.social.map((link) => {
            return (
              <li key={link.id} className="footer-menu-social-item">
                <a href={link.href} target="_blank" rel="noopener noreferrer"> {link.literal} </a>
              </li>
            );
          })}
        </ul>
        </div>
        <div className="footer-menu-legal-wrap">
          <h3>Legal</h3>
          <ul className="footer-menu-legal">
          {FOOTER_MENU_LINKS.legal.map((link) => {
            return (
              <li key={link.id} className="footer-menu-legal-item">
                <Link  rel="noopener noreferrer" to={link.href}> {link.literal} </Link>
              </li>
            );
          })}
        </ul>
        </div>
      </nav>
    </footer>
  );
};
