import type { FormTypeMap } from "./generic.form.types";

export interface FormProps<T extends schemaType> {
  formFieldsList: FormField[];
  apiEndpoint: string;
  formLinks?: FormLink[];
  title: string;
  buttonLiteral: string;
  formSchemaType: T;
  payloadTransformer?: (data: FormTypeMap[T]) => unknown;
  redirectOnSuccess?: string;
  onSuccess?: () => void | Promise<void>;
}

export interface FormField {
  id: string;
  literal: string;
  required: boolean;
  inputType: string;
  autofocus?: boolean;
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
  loginForm: "login",
  contactForm: "contact"
} as const;

export type schemaType =  typeof schemaTypes[keyof typeof schemaTypes]


