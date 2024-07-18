import React,  { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import useLoan from '../hooks/loans';

function CreateLoanScreen() {
  const { createLoan, isLoading } = useLoan()
  const [state, setState] = useState({
    name: '',
    amount: '',
    description: '',
    estimated_refund_date: '',
    currency: '',
    ves_exchange: '',
    rate: '',
    rate_type: '',
  })

  // if(isLoading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator animating color={MD2Colors.red800} />
  //     </View>
  //   )
  // }

  const onSubmit = async () => {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>Nuevo préstamo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  h1Text: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold'
  },
})

export default CreateLoanScreen