import * as yup from "yup";

export const opinionesSchema = yup.object({
    email: yup
        .string()
        .email('El correo electrónico no es válido')
        .required("Este campo es obligatorio"),
    pass: yup
        .string()
        .required("Este campo es obligatorio")
        .min(4, "El mínimo de caracteres es 4")
});