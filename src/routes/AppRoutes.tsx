import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Inicio } from "../pages/home/Inicio";
import { NotFound } from "../pages/system/NotFound";
import { ProtectedRoute } from "./guards/ProtectedRoute";

const Contact = lazy(() =>
  import("../pages/contact/Contact").then((module) => ({
    default: module.Contact,
  })),
);
const Login = lazy(() =>
  import("../pages/auth/Login").then((module) => ({ default: module.Login })),
);
const Logout = lazy(() =>
  import("../pages/auth/Logout").then((module) => ({ default: module.Logout })),
);
const Mybooks = lazy(() =>
  import("../pages/user-books/Mybooks").then((module) => ({
    default: module.Mybooks,
  })),
);
const Register = lazy(() =>
  import("../pages/auth/Register").then((module) => ({
    default: module.Register,
  })),
);
const SearchPage = lazy(() =>
  import("../pages/books/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);

const BookDetailPage = lazy(() =>
  import("../pages/books/BookDetailPage").then((module) => ({
    default: module.BookDetailPage,
  })),
);

export const AppRoutes = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route
            path="/libros/:provider/:providerBookId"
            element={<BookDetailPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Contact />} />
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
