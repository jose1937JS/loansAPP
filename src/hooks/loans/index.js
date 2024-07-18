import api from "../../api";
import React from 'react'

export default function useLoan() {
  const [loans, setLoans] = React.useState([])
  const [loan, setLoan] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const getLoans = async () => {
    await api.get('/loans')
    .then(({ data }) => {
      // console.log("GetLoansData", JSON.stringify(data, null, 4))
      setLoans(data.data)
    })
    .catch((err) => {
      console.log("ERROR", err.response)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const getLoan = async (id) => {
    await api.get(`/loans/${id}`)
    .then(({ data }) => {
      setLoan(data.data)
    })
    .catch((err) => {
      console.log("ERROR", err.response)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const createLoan = async (data) => {
    const response = null

    await api.post('/loans', data)
    .then(({ data }) => {
      response = data.data
    })
    .catch((err) => {
      console.log("ERROR", err.response)
    })
    .finally(() => {
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