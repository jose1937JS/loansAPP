import React,  { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { TextInput, MD2Colors } from 'react-native-paper';

import useLoan from '../hooks/loans';
import useDollar from '../hooks/dollar';
import { DollarContext } from '../context/dollarContext';

function CreateLoanScreen() {
  const { createLoan, isLoading: isCreatingLoan } = useLoan()
  const { dollar, setDollarPrice } = useContext(DollarContext)
  const [state, setState] = useState({
    name: '',
    amount: '',
    description: '',
    estimated_refund_date: '',
    currency: 'USD',
    ves_exchange: '0.00',
    rate: '',
    rate_type: 'enparalelovzla',
  })
  const [shouldFetch, setShouldFetch] = useState(false)
  const { data: updatedDollarPrice, isLoading } = useDollar(shouldFetch, state.rate_type)

  useEffect(() => {
    if(updatedDollarPrice) {
      console.log("DOLLAR", JSON.stringify(updatedDollarPrice, null, 4))
      setDollarPrice(updatedDollarPrice)

      if(state.ves_exchange > 0) {
        const ves_exchange = (updatedDollarPrice * state.amount).toFixed(2)
        setState({ ...state, ves_exchange })
      }
    }
  }, [updatedDollarPrice])

  const onChangeText = (key, value) => {
    setState({
      ...state,
      [key]: value
    })
  }

  // EVITAR QUE SE HAGAN 2 PETICIONES A LA API
  const onChangeRateType = async (value) => {
    onChangeText('rate_type', value)
    setShouldFetch(true)
  }

  const onChangeAmount = async (text) => {
    // (LISTO) obtener el rate del VES en base al tipo de rate (state.rate_type) y calcular el precio en bs
    // (LISTO) y mostrarlo en ves_exchange, esto siempre y cuando el prestamo sea en USD
    // En caso de ser VES, se debe rellenar directamente el campo ves_exchange y calcular los USD en base al rate_type
    const ves_exchange = (dollar * text).toFixed(2)

    setState({
      ...state,
      amount: text,
      ves_exchange
    })
  };

  const onSubmit = async () => {
    createLoan(state)
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.h1Text}>Nuevo préstamo</Text>

        <View style={styles.marginBottom}>
          <TextInput
            mode="outlined"
            label="Nombre de la persona"
            value={state.name}
            onChangeText={(text) => onChangeText('name', text)}
            right={<TextInput.Icon icon="account-outline" />}
          />
        </View>

        <Text style={styles.labelPicker}>Selecciona la moneda:</Text>
        <View style={styles.pickerStyle}>
          <RNPickerSelect
            onValueChange={(value) => onChangeText('currency', value)}
            items={[
              { label: 'USD', value: 'USD' },
              { label: 'VES', value: 'VES' },
            ]}
          />
        </View>

        { state.currency == 'VES' &&
          <View>
            <Text style={styles.labelPicker}>Selecciona el tipo de tasa:</Text>
            <View style={styles.pickerStyle}>
              <RNPickerSelect
                value={state.rate_type}
                onValueChange={onChangeRateType}
                items={[
                  { value: 'bcv', label: 'BCV' },
                  { value: 'enparalelovzla', label: 'Paralelo' },
                ]}
              />
            </View>
          </View>
        }

        <View style={styles.marginBottom}>
          <TextInput
            mode="outlined"
            label="Monto"
            value={state.amount}
            onChangeText={(text) => onChangeAmount(text)}
            right={<TextInput.Icon icon="cash" />}
          />
        </View>

        { state.currency == 'VES' &&
          <View style={styles.marginBottom}>
            <Text style={styles.labelPicker}>Cambio a VES</Text>
            <View style={styles.vesExchangeInput}>
              <Text style={styles.vesExchangeInputText}>{state.ves_exchange ?? 'Cambio a VES'}</Text>
            </View>
          </View>
        }

        <View style={styles.marginBottom}>
          <TextInput
            mode="outlined"
            label="Descripción"
            value={state.description}
            onChangeText={(text) => onChangeText('description', text)}
            right={<TextInput.Icon icon="menu" />}
          />
        </View>
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
    marginBottom: 50,
    color: 'black',
    fontWeight: 'bold'
  },
  pickerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: MD2Colors.grey700
  },
  marginBottom: {
    marginBottom: 20
  },
  labelPicker: {
    marginBottom: 5,
    fontSize: 13
  },
  vesExchangeInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: MD2Colors.grey700
  },
  vesExchangeInputText: {
    fontSize: 17,
    color: MD2Colors.grey800
  }
})

export default CreateLoanScreen