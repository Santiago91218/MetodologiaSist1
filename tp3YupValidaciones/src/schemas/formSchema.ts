import { object, ref, string } from "yup";

export const formSchema = object({
  name: string()
    .required("El campo nombre es obligatorio")
    .min(3, "El nombre debe tener minimo 3 caracteres"),
  email: string()
    .required("El correo es obligatorio")
    .email("El correo debe tener un formato valido"),
  password: string()
    .required("El campo contraseña es obligatorio")
    .min(6, "La contraseña debe tener minimo 6 caracteres"),
  repeatPass: string()
    .required("El campo confirmar contraseña es obligatorio")
    .oneOf([ref("password")], "La contraseña debe coincidir"),
});
