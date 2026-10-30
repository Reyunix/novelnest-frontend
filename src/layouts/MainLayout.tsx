import { Suspense, useEffect } from "react";
import { FeedbackState } from "../components/FeedbackState";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

export const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <Suspense fallback={<FeedbackState title="Abriendo página…" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};
