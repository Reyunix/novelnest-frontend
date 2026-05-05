import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};
