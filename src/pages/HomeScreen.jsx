import React,  { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import Loans from '../components/Loans';
import useLoan from '../hooks/loans';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation()
  const { getLoans, loans, isLoading } = useLoan()

  useEffect(() => {
    getLoans()
  }, [])

  if(isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating color={MD2Colors.red800} />
      </View>
    )
  }

  const navigate = () => navigation.navigate('CreateLoanScreen')

  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>Préstamos</Text>

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
        onPress={navigate}
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
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default HomeScreen