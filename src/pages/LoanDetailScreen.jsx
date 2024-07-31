import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { List, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import useLoan from '../hooks/loans';

function LoanDetailScreen({ route }) {
  const { getLoan, loan, isLoading } = useLoan()

  useEffect(() => {
    getLoan(route?.params?.id)
  }, [])

  if(isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating color={MD2Colors.red800} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1Text}>{loan?.name}</Text>

        <List.Section title="Prestatario">
          <List.Item
            title="Nombre"
            description={loan?.name}
            left={props => <List.Icon {...props} icon="account" />}
          />
        </List.Section>

        <List.Section title="Préstamo">
          <List.Item
            title="Moneda"
            description={loan?.currency}
            left={props => <List.Icon {...props} icon="cash-fast" />}
          />

          <Divider />

          <List.Item
            title="Cantidad"
            description={loan?.amount}
            left={props => <List.Icon {...props} icon="currency-usd" />}
          />

          <Divider />

          <List.Item
            title="Cambio a VES"
            description={loan?.ves_exchange}
            left={props => <List.Icon {...props} icon="cash-fast" />}
          />

          <Divider />

          <List.Item
            title="Descripción"
            description={loan?.description}
            left={props => <List.Icon {...props} icon="text-box" />}
          />
        </List.Section>

        <List.Section title="Tasa de cambio">
          <List.Item
            title="Tipo"
            description={loan?.rate_type}
            left={props => <List.Icon {...props} icon="bank" />}
          />

          <Divider />

          <List.Item
            title="Valor"
            description={loan?.rate}
            left={props => <List.Icon {...props} icon="chart-bar" />}
          />
        </List.Section>

        <List.Section title="Estadísticas">
          <List.Item
            title="Cantidad devuelta"
            description={`${loan?.amount_returned} USD`}
            left={props => <List.Icon {...props} icon="arrow-right-bold-outline" />}
          />

          <Divider />

          <List.Item
            title="Cantidad restante"
            description={`${loan?.remaining_amount} USD`}
            left={props => <List.Icon {...props} icon="arrow-left-bold-outline" />}
          />
        </List.Section>

        <List.Section title="Fechas">
          <List.Item
            title="Fecha estimada de devolución"
            description={dayjs(loan?.estimated_refund_date).format('LL')}
            left={props => <List.Icon {...props} icon="calendar-range" />}
          />

          <Divider />

          <List.Item
            title="Fecha de creación"
            description={dayjs(loan?.created_at).format('LL') }
            left={props => <List.Icon {...props} icon="calendar-today" />}
          />
        </List.Section>

        <List.Section title="Reembolsos">
          {
            loan?.refunds?.map((item) => (
              <>
                <List.Item
                  key={item.id}
                  title={`${item.amount} USD`}
                  description={dayjs(item.created_at).format('LL')}
                  left={props => <List.Icon {...props} icon="calendar-range" />}
                />

                <Divider />
              </>
            ))
          }
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
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default LoanDetailScreen
