import { createContext } from 'react'
export const DollarContext = createContext({
  dollar: 0,
  rateType: '',
  setRateType: (value) => {},
  setDollarPrice: (value) => {}
})
