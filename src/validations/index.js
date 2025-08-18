import { string, number, date, object } from "yup"

const validationSchema = object({
  name: string().trim().required('Este campo es requerido'),
  amount: number().typeError('Este campo debe ser un número válido').required('Este campo es requerido'),
  description: string().trim().nullable(),
  estimated_refund_date: date().typeError('Por favor ingresa una fecha válida').required('Este campo es requerido'),
  currency: string().oneOf(['VES', 'USD']).required('Este campo es requerido'),
  ves_exchange: string().trim().required('Este campo es requerido'),
  rate: number().required('Este campo es requerido'),
  rate_type: string().oneOf(['bcv', 'binance']).required('Este campo es requerido'),
})

const refundSchema = object({
  amount: number()
    .typeError('Debe ser un número válido')
    .positive('Debe ser mayor a 0')
    .required('Este campo es requerido'),
  ves_exchange: number()
    .typeError('Debe ser un número válido')
    .positive('Debe ser mayor a 0')
    .required('Este campo es requerido'),
  currency: string().oneOf(['USD', 'VES']).required('Este campo es requerido'),
  loan_id: number().required('Falta el préstamo'),
  rate: number().nullable(),
});

export { validationSchema, refundSchema }