import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: string;
}
export const FormField = ({
  label,
  registration,
  error,
  type = "text",
  autoComplete,
}: Props) => (
  <div className="form-group">
    <label className="form-label" htmlFor={registration.name}>
      {label}
    </label>
    <input
      {...registration}
      id={registration.name}
      type={type}
      autoComplete={autoComplete}
      required
      className="form-input-field"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${registration.name}-error` : undefined}
    />
    {error && (
      <p
        className="error-message"
        role="alert"
        id={`${registration.name}-error`}
      >
        {error.message}
      </p>
    )}
  </div>
);
