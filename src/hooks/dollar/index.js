import axios from "axios";
import React from 'react'

export default function useDollar() {
  const [dollar, setDollar] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // oficial = bcv
  // paralelo = enparalelovzla
  const getDollarPrice = async (rate_type = 'enparalelovzla') => {

    // Para evitar llamadas innecesarias a la api cuando el valor del dollar esta seteado
    if(!dollar) {
      await axios.get(`https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=criptodolar&monitor=${rate_type}`)
      .then(({ data }) => {
        console.log("RES DOLLAR", JSON.stringify(data, null, 4))
        setDollar(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err.response, null, 4))
        setIsLoading(false)
      })
    }
  }

  return {
    getDollarPrice,
    dollar,
    isLoading,
  }
}