import type { LoginForm } from "../../features/auth/schemas/login.form.schemas";
import type { RegisterForm } from "../../features/auth/schemas/register.form.schemas";
import type { ContactForm } from "../../features/contact/schemas/contact.form.schemas";

export type FormTypeMap = {
  login: LoginForm;
  register: RegisterForm;
  contact: ContactForm;
};