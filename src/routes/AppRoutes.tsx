import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Contact } from "../pages/Contact";
import { Inicio } from "../pages/Inicio";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { Mybooks } from "../pages/Mybooks";
import { NotFound } from "../pages/NotFound";
import { Register } from "../pages/Register";
import { SearchPage } from "../pages/SearchPage";
import { ProtectedRoute } from "./guards/ProtectedRoute";

export const AppRoutes = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/mis-libros"
            element={
              <ProtectedRoute>
                <Mybooks />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
