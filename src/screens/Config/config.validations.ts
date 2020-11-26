import * as yup from "yup"

const validations = () => {
  const schema = yup.object().shape({
    currentBalance: yup.number().required("Obrigatório.").typeError("Deve ser um número."),
    investment: yup.number().required("Obrigatório.").typeError("Deve ser um número."),
    balanceTotal: yup.number().required("Obrigatório.").typeError("Deve ser um número."),
  })

  return schema
}

export default validations
