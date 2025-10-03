import type { LoginForm } from "../schemas/loginFormSchema";

export interface FormProps {
  formFieldsList: FormField[];
  apiEndpoint: string;
  formLinks?: FormLink[];
  title: string;
  buttonLiteral: string;
  formSchemaType: schemaType;
  payloadTransformer?: (data: LoginForm) => unknown 
}

export interface FormField {
  id: string;
  literal: string;
  required: boolean;
  inputType: string;
  autofocus: boolean;
}

export interface FormLink {
  id: number;
  literal: string;
  href: string;
  customPosition?: boolean
  fieldPosition?: string
}

export const schemaTypes = {
  registerForm: "register",
  logingForm: "login",
  contactForm: "contact"
} as const;

export type schemaType =  typeof schemaTypes[keyof typeof schemaTypes]
