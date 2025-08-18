import axios from "axios";
import useSWR from 'swr'

export default function useDollar(shouldFetch = false, monitor = 'usd', page = 'bcv') {
  const fetcher = (url) => {
    return axios.get(url)
      .then(({ data }) => {
        console.log("RES DOLLAR", JSON.stringify(data, null, 4));
        return data.price;
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err?.response, null, 4));
        return null;
      });
  };

  // Para debug, muestra los parámetros actuales
  console.log({ url: `https://pydolarve.org/api/v2/dollar?page=${page}&monitor=${monitor}` });

  return useSWR(shouldFetch ? `https://pydolarve.org/api/v2/dollar?page=${page}&monitor=${monitor}` : null, fetcher);
}