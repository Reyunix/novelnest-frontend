import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
