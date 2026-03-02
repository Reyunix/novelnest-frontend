import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Contact } from "../pages/contact/Contact";
import { Inicio } from "../pages/home/Inicio";
import { Login } from "../pages/auth/Login";
import { Logout } from "../pages/auth/Logout";
import { Mybooks } from "../pages/user-books/Mybooks";
import { NotFound } from "../pages/system/NotFound";
import { Register } from "../pages/auth/Register";
import { SearchPage } from "../pages/books/SearchPage";
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
