import * as yup from "yup"

const validations = () => {
  const schema = yup.object().shape({
    type: yup.string().required("Obrigatório."),
    value: yup.number().required("Obrigatório.").typeError("Apenas números são permitidos."),
    description: yup.string().required("Obrigatório.")
  })

  return schema
}

export default validations
