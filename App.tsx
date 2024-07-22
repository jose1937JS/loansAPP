import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native'
import Router from './src/router';
import dayjs from 'dayjs';
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DollarContext } from './src/context/dollarContext'
import useDollar from './src/hooks/dollar';
import globalStyles from './src/styles'

require('dayjs/locale/es')

dayjs.extend(localizedFormat);
dayjs.locale('es') // use locale globally

function App(): React.JSX.Element {
  const [dollar, setDollarPrice] = useState(0)
  const { data, isLoading } = useDollar()

  useEffect(() => {
    if(data) {
      setDollarPrice(data)
    }
  }, [data])

  if(isLoading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <DollarContext.Provider value={{
      dollar,
      setDollarPrice
    }}>
      <Router />
    </DollarContext.Provider>
  );
}

export default App;
