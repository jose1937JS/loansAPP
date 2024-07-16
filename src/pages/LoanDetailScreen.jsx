import dayjs from 'dayjs';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

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

      <View style={styles.tableContainer}>
        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Prestatario</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.name}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Monto</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.amount}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Moneda</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.currency}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Cambio a VES</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.ves_exchange}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Tasa</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.rate}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Tipo de tasa</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.rate_type}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Dinero por devolver</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.remaining_amount}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Dinero devuelto</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.amount_returned}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Fecha estimada de devolución</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{dayjs(loan.estimated_refund_date).format('MMMM MM')}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Fecha del préstamo</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{dayjs(loan.created_at).format('MMM MM HH:mm')}</Text>
          </View>
        </View>

        <View style={styles.tableItemContainer}>
          <View style={styles.tableContainerItem}>
            <Text style={styles.bold}>Descripción</Text>
          </View>

          <View style={styles.tableContainerItem}>
            <Text>{loan.description}</Text>
          </View>
        </View>
      </View>

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
  },
  tableItemContainer: {
    flexDirection: 'row',

  },
  tableContainer: {
    borderWidth: 0.5,
    borderBottomWidth: 0
  },
  tableContainerItem: {
    width: '50%',
    borderBottomWidth: 0.5,
    padding: 5,
    justifyContent: 'center'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default LoanDetailScreen
