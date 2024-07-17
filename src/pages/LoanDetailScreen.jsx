import dayjs from 'dayjs';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { List, Divider } from 'react-native-paper';

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
    created_at: "2024-07-10 00:13:16"
  })

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1Text}>{loan.name}</Text>

        <List.Section title="Prestatario">
          <List.Item
            title="Nombre"
            description={loan.name}
            left={props => <List.Icon {...props} icon="account" />}
          />
        </List.Section>

        <List.Section title="Préstamo">
          <List.Item
            title="Moneda"
            description={loan.currency}
            left={props => <List.Icon {...props} icon="cash-fast" />}
          />

          <Divider />

          <List.Item
            title="Cantidad"
            description={loan.amount}
            left={props => <List.Icon {...props} icon="currency-usd" />}
          />

          <Divider />

          <List.Item
            title="Cambio a VES"
            description={loan.ves_exchange}
            left={props => <List.Icon {...props} icon="cash-fast" />}
          />

          <Divider />

          <List.Item
            title="Descripción"
            description={loan.description}
            left={props => <List.Icon {...props} icon="text-box" />}
          />
        </List.Section>

        <List.Section title="Tasa de cambio">
          <List.Item
            title="Tipo"
            description={loan.rate_type}
            left={props => <List.Icon {...props} icon="bank" />}
          />

          <Divider />

          <List.Item
            title="Valor"
            description={loan.rate}
            left={props => <List.Icon {...props} icon="chart-bar" />}
          />
        </List.Section>

        <List.Section title="Estadísticas">
          <List.Item
            title="Cantidad devuelta"
            description={`${loan.amount_returned} USD`}
            left={props => <List.Icon {...props} icon="arrow-right-bold-outline" />}
          />

          <Divider />

          <List.Item
            title="Cantidad restante"
            description={`${loan.remaining_amount} USD`}
            left={props => <List.Icon {...props} icon="arrow-left-bold-outline" />}
          />
        </List.Section>

        <List.Section title="Fechas">
          <List.Item
            title="Fecha estimada de devolución"
            description={dayjs(loan.estimated_refund_date).format('LL')}
            left={props => <List.Icon {...props} icon="calendar-range" />}
          />

          <Divider />

          <List.Item
            title="Fecha de creación"
            description={dayjs(loan.created_at).format('LL') }
            left={props => <List.Icon {...props} icon="calendar-today" />}
          />
        </List.Section>
      </View>

    </ScrollView>
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
    marginBottom: 20,
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
