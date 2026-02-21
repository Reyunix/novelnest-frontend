import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Header } from "../pages/Header";
import { Footer } from "../pages/Footer";
import { SearchPage } from "../pages/SearchPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Contact } from "../pages/Contact";
import { Protected } from "../pages/Protected";
import { Mybooks } from "../pages/Mybooks";
import { Logout } from "../pages/Logout";
// import { Test } from "../Test";

export const AppRoutes:React.FC = () =>{

    return(
        <BrowserRouter>
        {/* Layout */}
        <Header/>

        {/* Contenido principal y rutas */}
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="/inicio" element={<Inicio/>} />
                <Route path="/buscar" element={<SearchPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/mis-libros" element={<Protected><Mybooks/></Protected>} />

                {/* <Route path="/test" element={<Test/>} /> */}
            </Routes>
        </main>

        <Footer/>

        </BrowserRouter>
    )
}