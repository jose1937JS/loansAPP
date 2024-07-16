import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FAB } from 'react-native-paper';
import Loans from '../components/Loans';

function LoanDetailScreen() {
  const [loan, setLoan] = useState({
    id: 1,
    name: "Marco Aurelio Lopez",
    amount: "10.00",
    currency: "USD",
    ves_exchange: "500.00",
    description: "Esto es una descripcion o nota del prestamo que es opcional",
    rate: "50.00",
    rate_type: "bcv",
    remaining_amount: "10.00",
    amount_returned: "0.00",
    estimated_refund_date: "2024-07-16",
    created_at: "2024-07-16 00:13:16"
  })

  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>{loan.name}</Text>

      <Text>{JSON.stringify(loan, null, 4)}</Text>

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
    marginBottom: 50,
    fontWeight: 'bold'
  }
})

export default LoanDetailScreen