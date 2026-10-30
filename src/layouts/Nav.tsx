import { DemoStartButton } from "../features/demo/DemoControls";
import { useDemo } from "../features/demo/demoContext";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

export const Nav = () => {
  const { authStatus } = useAuth();
  const { active: demo } = useDemo();
  const location = useLocation();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const open = openAt === location.key;
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenAt(null);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const links = [
    { href: "/inicio", label: "Inicio" },
    { href: "/buscar", label: "Explorar" },
    ...(authStatus === "authenticated"
      ? [
          { href: "/mis-libros", label: "Mi biblioteca" },
          { href: "/logout", label: "Cerrar sesión" },
        ]
      : [
          ...(demo
            ? [{ href: "/mis-libros", label: "Mi biblioteca de prueba" }]
            : []),
          { href: "/login", label: "Iniciar sesión" },
          { href: "/register", label: "Crear cuenta" },
        ]),
  ];
  return (
    <>
      <button
        ref={toggle}
        className="header-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpenAt(open ? null : location.key)}
      >
        {open ? "Cerrar ✕" : "Menú ☰"}
      </button>
      <nav
        id="main-navigation"
        aria-label="Navegación principal"
        className={open ? "header-nav header-nav--open" : "header-nav"}
      >
        <ul className="header-menu">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink to={link.href} onClick={() => setOpenAt(null)}>
                {link.label}
              </NavLink>
            </li>
          ))}
          {authStatus !== "authenticated" && !demo && (
            <li>
              <DemoStartButton label="Modo invitado" />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
