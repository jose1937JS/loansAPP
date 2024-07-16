import React,  { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FAB } from 'react-native-paper';
import Loans from '../components/Loans';

function HomeScreen() {
  const [loans, setLoans] = useState([
    {
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
    },
    {
      id: 2,
      name: "Allison Diaz",
      amount: "2113.58",
      currency: "USD",
      ves_exchange: "80000.00",
      description: "Prestamo para construccion de muro e su casa",
      rate: "40.00",
      rate_type: "dollar",
      remaining_amount: "1090.00",
      amount_returned: "1023.58",
      estimated_refund_date: "2030-01-01",
      created_at: "2024-07-16 00:13:16"
    },
    {
      id: 3,
      name: "Fulanito",
      amount: "10.00",
      currency: "USD",
      ves_exchange: "400.00",
      description: "Esto es una descripcion o nota del prestamo que es opcional",
      rate: "40.00",
      rate_type: "paralelo",
      remaining_amount: "0.00",
      amount_returned: "10.00",
      estimated_refund_date: "2024-07-13",
      created_at: "2024-01-10 00:13:16"
    },
    {
      id: 4,
      name: "Marcos perez",
      amount: "20.00",
      currency: "VES",
      ves_exchange: "1600.00",
      description: "Mir seiscientos bolos",
      rate: "40.00",
      rate_type: "paralelo",
      remaining_amount: "10.00",
      amount_returned: "10.00",
      estimated_refund_date: "2024-07-16",
      created_at: "2024-05-16 00:13:16"
    }
  ])
  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>Préstamos</Text>

      {/* Listado de prestamos */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.loansContainer}
        data={loans}
        renderItem={({item}) => <Loans item={item} />}
        keyExtractor={item => item.id}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  loansContainer: {
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
  h1Text: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold'
  }
})

export default HomeScreen