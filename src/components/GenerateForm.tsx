import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  type RegisterForm,
} from "../schemas/registerFormSchema";
import { LoginFormSchema, type LoginForm } from "../schemas/loginFormSchema";
import { FORM_ERRORMAP } from "../consts";
import type { FormProps } from "../types/interfaces";

export const GenerateForm: React.FC<FormProps> = ({
  formFieldsList,
  apiEndpoint,
  formLinks,
  title,
  buttonLiteral,
  formSchemaType,
}) => {
  const schemaMap = {
    login: LoginFormSchema,
    register: RegisterFormSchema,
  };

  type typeMap = {
    login: LoginForm;
    register: RegisterForm;
  };

  const formSchema = schemaMap[formSchemaType];
  type FormData = typeMap[typeof formSchemaType];

  const focusField = formFieldsList[0].id;
  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setFocus(focusField as keyof FormData);
  }, [focusField, setFocus]);

  const onSubmit = async (data: FormData) => {
    const payload = data.userName?.includes("@")
      ? {
          userEmail: data.userName,
          userPassword: data.userPassword,
        }
      : {
          userName: data.userName,
          userPassword: data.userPassword,
        };
    console.log(apiEndpoint);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Manejar errores del backend
        const errorData: { errorCode: string; message: string } =
          await response.json();
        console.log(errorData.errorCode);
        // Form error map can be undefined because is not mandatory
        if (errorData.errorCode in FORM_ERRORMAP) {
          const fieldName =
            FORM_ERRORMAP[errorData.errorCode as keyof typeof FORM_ERRORMAP];

          setError(fieldName, {
            type: "manual",
            message: errorData.message,
          });
        }

        return;
      }
      console.log("Usuario registrado exitosamente");
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
                  {...register(field.id as keyof FormData)}
                />
                {
                  formLinks.map((link) => {
                    if (link.customPosition && link.fieldPosition === field.id)
                      return (
                        <NavLink key={link.id} to={link.href} className="links">
                          {link.literal}
                        </NavLink>
                      );
                  })}
                {errors[field.id as keyof FormData]?.message && (
                  <p>{String(errors[field.id as keyof FormData]?.message)}</p>
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
                if (!link.customPosition) {
                  return (
                    <NavLink to={link.href} className="links" key={link.id}>
                      {link.literal}
                    </NavLink>
                  );
                }
              })}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};
