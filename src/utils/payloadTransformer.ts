import type { LoginForm } from "../schemas/loginFormSchema"

export const payloadTransformer = (data: LoginForm) => {

  return {userEmail: data.userName, userPassword: data.userPassword} 
}
