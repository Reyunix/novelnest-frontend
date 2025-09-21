import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, type RegisterForm } from "../schemas/registerFormSchema";

import type { iFormProps } from "../types/interfaces";


export const GenerateForm: React.FC<iFormProps> = ({ formFieldsList, apiEndpoint, formLinks, title, buttonLiteral }) => {
  const focusField = formFieldsList[0].id
  const {
    register,
    setFocus,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  useEffect(() => {
    setFocus(focusField as keyof RegisterForm);
  }, [setFocus]);

  const onSubmit = async (data: RegisterForm) => {
    console.log("Se ejecuta la función onSubmit");
    console.log(apiEndpoint);
    console.log(data);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Manejar errores del backend
        console.error("Error al registrar el usuario");
      } else {
        // Redirigir al usuario o mostrar un mensaje de éxito
        console.log("Usuario registrado exitosamente");
      }
    } catch (error) {
      console.error("Hubo un error en la solicitud:", error);
    }
    reset();
  };
  return (
    <div className="center">
      <div className="form-layout">
        <header className="form-header">
          <h1 className="form-h1">{title}</h1>
        </header>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formFieldsList.map((field) => {
            return (
              <div key={field.id}>
                <label htmlFor={field.id} className="form-label">
                  {field.literal}
                  {field.required && <span className="required-field"> *</span>}
                </label>
                <input
                  type={field.inputType}
                  id={field.id}
                  required={field.required}
                  {...register(field.id as keyof RegisterForm)}
                />
                {errors[field.id as keyof RegisterForm]?.message && (
                  <p>{errors[field.id as keyof RegisterForm]?.message}</p>
                )}
              </div>
            );
          })}
          <footer className="form-footer">
            <button type="submit" className="btn">
              {buttonLiteral}
            </button>
            <div className="flex-row">
              {formLinks.map((link) => {
                return (
                  <NavLink to={link.href} className="links" key={link.id}>
                {link.literal}
              </NavLink>
                )
              })}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};
