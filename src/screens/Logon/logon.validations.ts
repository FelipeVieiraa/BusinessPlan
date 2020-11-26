import * as yup from "yup"

const validations = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Inválido.").required("Obrigatório."),
    password: yup.string().required("Obrigatório.")
  })

  return schema
}

export default validations
