import axios from "axios";
import useSWR from 'swr'

export default function useDollar(shouldFetch = true, rate_type = 'enparalelovzla') {
  // rate_type:
  // oficial = bcv
  // paralelo = enparalelovzla

  const fetcher = (url) => {
    const res = axios.get(url)
    .then(({ data }) => {
      console.log("RES DOLLAR", JSON.stringify(data, null, 4))
      return data.price
    })
    .catch((err) => {
      console.log("ERROR", JSON.stringify(err.response, null, 4))
    })

    return res
  }

  return useSWR(shouldFetch ? `https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=criptodolar&monitor=${rate_type}` : null, fetcher)

}
