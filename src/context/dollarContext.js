import { createContext } from 'react'
export const DollarContext = createContext({
  dollar: 0,
  monitor: '',
  page: '',
  isDollarLoading: false,
  setPage: (value) => {},
  setMonitor: (value) => {},
  setDollarPrice: (value) => {}
})
