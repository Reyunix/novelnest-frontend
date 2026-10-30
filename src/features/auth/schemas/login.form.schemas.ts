import { z } from "zod";

export const LoginFormSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(1, "Introduce tu nombre de usuario o correo electrónico"),
  userPassword: z.string().min(1, "La contraseña es obligatoria"),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;
