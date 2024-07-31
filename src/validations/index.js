import { string, number, date, object } from "yup"

const validationSchema = object({
  name: string().trim().required('Este campo es requerido'),
  amount: number().typeError('Este campo debe ser un número válido').required('Este campo es requerido'),
  description: string().trim().nullable(),
  estimated_refund_date: date().typeError('Por favor ingresa una fecha válida').required('Este campo es requerido'),
  currency: string().oneOf(['VES', 'USD']).required('Este campo es requerido'),
  ves_exchange: string().trim().required('Este campo es requerido'),
  rate: number().required('Este campo es requerido'),
  rate_type: string().oneOf(['bcv', 'enparalelovzla']).required('Este campo es requerido'),
})

export default validationSchema