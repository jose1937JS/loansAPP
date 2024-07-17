import api from "../../api";
import React from 'react'

export default function Loan() {
  const [loans, setLoans] = React.useState([])
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

  return {
    getLoans,
    loans,
    isLoading
  }
}