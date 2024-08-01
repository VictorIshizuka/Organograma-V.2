import * as yup from "yup";

import { isWithoutSpace } from "@/common/helpers/string";

const email = yup
  .string()
  .email("Este campo deve ser um email válido")
  .required("Este campo é obrigatório");

const password = yup
  .string()
  .min(6, "Este campo deve possuir no mínimo 6 de tamanho")
  .max(100, "Este campo deve possuir no máximo 100 de tamanho")
  .matches(/[A-Z]/, "Este campo deve conter ao menos um caractere maiúsculo")
  .matches(/[a-z]/, "Este campo deve conter ao menos um caractere minúsculo")
  .matches(/[0-9]/, "Este campo deve conter ao menos um número")
  .matches(
    /[!@#$%^&*.]/,
    "Este campo deve conter ao menos um caractere especial"
  )
  .test(
    "isWithoutSpace",
    "Este campo nao deve conter espaços em branco",
    isWithoutSpace
  );

export const profileValidations = yup.object({
  name: yup
    .string()
    .required("Esta campo é obrigatório")
    .min(2, "Este campo deve conter no mínimo 2 de tamanho")
    .max(100, "Este campo deve conter no máximo 100 de tamanho"),
  email: email,
  team: yup.string().required("Este campo é obrigatório"),
  role: yup
    .string()
    .required("Esta campo é obrigatório")
    .min(2, "Este campo deve conter no mínimo 2 de tamanho")
    .max(100, "Este campo deve conter no máximo 100 de tamanho"),
  photo: yup.string(),
  // .url("URL inválida")
  // .matches(/^https:\/\//, "A URL deve começar com https")
  // .matches(/\.com$/, "A URL deve terminar com .com"),
  password: password,
  confirmPassword: password.oneOf(
    [yup.ref("password")],
    "As senha devem ser iguais"
  ),
});
