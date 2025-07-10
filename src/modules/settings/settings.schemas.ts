import * as yup from "yup";

export const permissionSchema = yup.object({
    action: yup
        .object({
            id: yup.number().required(),
            name: yup.string().required(),
        })
        .required("La acción es requerida"),

    prefix: yup
        .string()
        .when("action.id", {
            is: 8,
            then: (schema) => schema
                .required("El prefijo es requerido")
                .matches(/^[A-Z]+$/, "Caracteres no permitidos")
                .min(2, "El mínimo de caracteres es 2"),
            otherwise: (schema) => schema.notRequired()
        }),

    name: yup
        .string()
        .required("El nombre es requerido")
        .matches(/^[A-Z]+$/, "Caracteres no permitidos")
        .min(2, "El mínimo de caracteres es 2"),

    description: yup
        .string()
        .required("La descripción es requerida")
        .matches(
            /^(?!\s)(?!.*\s$)[A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.“”"\-() ]+$/,
            "Caracteres no permitidos"
        )
        .min(10, "El mínimo de caracteres es 10"),
});
