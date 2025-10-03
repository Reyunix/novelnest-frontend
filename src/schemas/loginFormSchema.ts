import z from "zod";

export const LoginFormSchema = z
  .object({
    userName: z.string().optional(),
    userEmail: z.email("Formato de correo inválido").optional(),
    userPassword: z.string().min(1, "La contraseña es obligatoria"),
  })
  .refine((data) => data.userName || data.userEmail, {
    error: "Debes proporcionar un nombre de usuario o correo electrónico",
    path: ["userName"],
  });

export type LoginForm = z.infer<typeof LoginFormSchema>;
