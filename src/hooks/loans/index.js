import api from "../../api";
import React from 'react'

export default function useLoan() {
  const [loans, setLoans] = React.useState([])
  const [loan, setLoan] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const getLoans = async () => {
    setIsLoading(true)
    await api.get('/loans')
    .then(({ data }) => {
      // console.log("GetLoansData", JSON.stringify(data, null, 4))
      setLoans(data.data)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log("ERROR", err.response)
      setIsLoading(false)
    })
  }

  const getLoan = async (id) => {
    setIsLoading(true)
    await api.get(`/loans/${id}`)
    .then(({ data }) => {
      setLoan(data.data)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log("ERROR", err.response)
      setIsLoading(false)
    })
  }

  const createLoan = async (data) => {
    setIsLoading(true)
    const response = null

    await api.post('/loans', data)
    .then(({ data }) => {
      response = data.data
      setIsLoading(false)
    })
    .catch((err) => {
      console.log("ERROR", err.response)
      setIsLoading(false)
    })

    return response
  }

  return {
    getLoans,
    getLoan,
    createLoan,
    loans,
    isLoading,
    loan
  }
}