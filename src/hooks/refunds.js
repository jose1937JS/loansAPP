import api from "../api";
import Toast from 'react-native-toast-message';
import React from 'react'
import dayjs from "dayjs";

export default function useRefund() {
  const [isLoading, setIsLoading] = React.useState(false)

  const createRefund = async (data) => {
    setIsLoading(true)
    await api.post('/refunds', {
      ...data,
      // If estimated_refund_date existed we would format it; backend spec does not use it here
      // Normalize number strings
      amount: Number(data.amount),
      ves_exchange: Number(data.ves_exchange),
      rate: data?.rate ? Number(data.rate) : null,
    })
    .then(() => {
      Toast.show({
        type: 'success',
        text2: 'Reembolso registrado correctamente',
      });
      setIsLoading(false)
    })
    .catch((err) => {
      console.log("ERROR REFUND", err?.response)
      setIsLoading(false)
      Toast.show({
        type: 'error',
        text2: 'No se pudo registrar el reembolso',
      });
    })
  }

  return {
    createRefund,
    isLoading,
  }
}


