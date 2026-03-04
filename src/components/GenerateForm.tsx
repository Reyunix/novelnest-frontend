import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type Path, type Resolver } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FORM_ERRORMAP } from "../shared/constants/fomr.errormap.constants";
import { LoginFormSchema } from "../features/auth/schemas/login.form.schemas";
import { ContactFormSchema } from "../features/contact/schemas/contact.form.schemas";
import { RegisterFormSchema } from "../features/auth/schemas/register.form.schemas";
import { parseApiError, postJson } from "../shared/http/postJson";
import type { iFormProps, schemaType } from "../shared/forms/generic.form.schemas";
import type { FormTypeMap } from "../shared/forms/generic.form.types";

export const GenerateForm = <T extends schemaType>({
  formFieldsList,
  apiEndpoint,
  formLinks,
  title,
  buttonLiteral,
  formSchemaType,
  redirectOnSuccess,
  payloadTransformer,
  onSuccess,
}: iFormProps<T>) => {
  const navigate = useNavigate();

  const schemaMap = {
    login: LoginFormSchema,
    register: RegisterFormSchema,
    contact: ContactFormSchema,
  };

  const formSchema = schemaMap[formSchemaType];
  type FormData = FormTypeMap[T];
  type FormDataTyped = Path<FormData>;

  const focusField = formFieldsList.find((field) => field.autofocus)?.id;
  const resolverTyped = zodResolver(
    formSchema,
  ) as unknown as Resolver<FormData>;
  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: resolverTyped });

  useEffect(() => {
    if (focusField) {
      setFocus(focusField as FormDataTyped);
    }
  }, [focusField, setFocus]);

  const onSubmit = async (data: FormData) => {
    const payload = payloadTransformer ? payloadTransformer(data) : data;

    try {
      const response = await postJson(apiEndpoint, payload);

      if (!response.ok) {
        const errorData = await parseApiError(response);
        const errorCode = errorData?.errorCode;

        if (errorCode && errorCode in FORM_ERRORMAP) {
          const fieldName =
            FORM_ERRORMAP[errorCode as keyof typeof FORM_ERRORMAP];

          setError(fieldName as FormDataTyped, {
            type: "manual",
            message: errorData?.message,
          });
        }
        return;
      }
      if (onSuccess) {
        await onSuccess();
      }
      // Redirect to the specified page on success and replace history entry.
      if (redirectOnSuccess) {
        navigate(redirectOnSuccess, { replace: true });
      }
      reset();
    } catch (error) {
      console.error("Hubo un error en la solicitud:", error);
      reset();
    }
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

                {field.inputType === "textarea" ? (
                  <textarea
                    key={field.id}
                    id={field.id}
                    required={field.required}
                    rows={15}
                    cols={70}
                    className="form-input-field"
                    {...register(field.id as FormDataTyped)}
                  ></textarea>
                ) : (
                  <input
                    key={field.id}
                    type={field.inputType}
                    id={field.id}
                    required={field.required}
                    {...register(field.id as FormDataTyped)}
                    className="form-input-field"
                  />
                )}

                {formLinks &&
                  formLinks.map((link) => {
                    if (link.customPosition && link.fieldPosition === field.id)
                      return (
                        <NavLink key={link.id} to={link.href} className="links">
                          {link.literal}
                        </NavLink>
                      );
                  })}
                {errors[field.id as keyof FormData]?.message && (
                  <p className="error-message">
                    {String(errors[field.id as keyof FormData]?.message)}
                  </p>
                )}
              </div>
            );
          })}
          <footer className="form-footer">
            <button type="submit" className="btn">
              {buttonLiteral}
            </button>
            <div className="flex-row">
              {formLinks &&
                formLinks.map((link) => {
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
