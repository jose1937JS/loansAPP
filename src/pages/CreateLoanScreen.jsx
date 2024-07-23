import React,  { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { TextInput, MD2Colors, Button, MD3Colors  } from 'react-native-paper';
import { useForm, Controller  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import validationSchema from '../validations'

import useLoan from '../hooks/loans';
import useDollar from '../hooks/dollar';
import { DollarContext } from '../context/dollarContext';

function CreateLoanScreen() {
  const { createLoan, isLoading: isCreatingLoan } = useLoan()
  const { dollar, rate_type, setDollarPrice, setRateType } = useContext(DollarContext)
  const [shouldFetch, setShouldFetch] = useState(false)

  const defaultValues = {
    name: '',
    amount: '',
    description: '',
    estimated_refund_date: '',
    currency: 'USD',
    ves_exchange: '0.00',
    rate: dollar,
    rate_type: rate_type,
  }

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const { data: updatedDollarPrice, isLoading } = useDollar(shouldFetch, getValues('rate_type'))

  useEffect(() => {
    if(updatedDollarPrice) {
      // console.log("DOLLAR", JSON.stringify(updatedDollarPrice, null, 4))
      setDollarPrice(updatedDollarPrice)
      setRateType(getValues('rate_type'))
      setValue('rate', updatedDollarPrice)

      if(getValues('ves_exchange') > 0) {
        const ves_exchange = (updatedDollarPrice * getValues('amount')).toFixed(2)
        setValue('ves_exchange', ves_exchange)
      }
    }
  }, [updatedDollarPrice])

  const onChangeRateType = (value) => {
    setValue('rate_type', value)
    setShouldFetch(true)
  }

  const onChangeAmount = (value) => {
    // (LISTO) obtener el rate del VES en base al tipo de rate (getValues('rate_type')) y calcular el precio en bs
    // (LISTO) y mostrarlo en ves_exchange, esto siempre y cuando el prestamo sea en USD
    // (LISTO) En caso de ser VES, se debe rellenar directamente el campo ves_exchange y calcular los USD en base al rate_type

    if(getValues('currency') == 'USD') {
      const ves_exchange = (dollar * value).toFixed(2)
      setValue('amount', value)
      setValue('ves_exchange', ves_exchange)
    }
    else {
      const dollar_exchange = (value / dollar).toFixed(2)
      setValue('amount', dollar_exchange)
      setValue('ves_exchange', value)
    }

  };

  const onSubmit = async (data) => {
    console.log("onSubmit", JSON.stringify(data, null, 4))
    // createLoan(data)
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.h1Text}>Nuevo préstamo</Text>

        <View style={styles.marginBottom}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                label="Nombre de la persona"
                value={value}
                onChangeText={onChange}
                right={<TextInput.Icon icon="account-outline" />}
              />
            )}
          />
          {errors.name && <Text style={styles.inputError}>{errors.name.message}</Text>}
        </View>

        <View style={styles.marginBottom}>
          <Text style={styles.labelPicker}>Selecciona la moneda:</Text>
          <View style={styles.pickerStyle}>
            <Controller
              name="currency"
              control={control}
              render={({ field: { value } }) => (
                <RNPickerSelect
                  value={value}
                  onValueChange={(value) => setValue('currency', value)}
                  items={[
                    { label: 'USD', value: 'USD' },
                    { label: 'VES', value: 'VES' },
                  ]}
                />
              )}
            />
          </View>
          {errors.currency && <Text style={styles.inputError}>{errors.currency.message}</Text>}
        </View>

        <View style={styles.marginBottom}>
          <Text style={styles.labelPicker}>Selecciona el tipo de tasa:</Text>
          <View style={styles.pickerStyle}>
            <Controller
              name="rate_type"
              control={control}
              render={({ field: { value } }) => (
                <RNPickerSelect
                  value={value}
                  onValueChange={onChangeRateType}
                  items={[
                    { value: 'enparalelovzla', label: 'Paralelo' },
                    { value: 'bcv', label: 'BCV' },
                  ]}
                />
              )}
            />
          </View>
        </View>

        { watch('currency') == 'USD' &&
          <View style={styles.marginBottom}>
            <Controller
              name="amount"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  label="Monto"
                  value={value}
                  onChangeText={onChangeAmount}
                  right={<TextInput.Icon icon="cash" />}
                />
              )}
            />
            {errors.amount && <Text style={styles.inputError}>{errors.amount.message}</Text>}
          </View>
        }

        { watch('currency') == 'USD' &&
          <View style={styles.marginBottom}>
            <Text style={styles.labelPicker}>Cambio a VES</Text>
            <View style={styles.vesExchangeInput}>
              <Text style={styles.vesExchangeInputText}>{watch('ves_exchange') ?? 'Cambio a VES'}</Text>
            </View>
          </View>
        }

        { watch('currency') == 'VES' &&
          <View style={styles.marginBottom}>
            <Controller
              name="ves_exchange"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  label="Monto"
                  value={value}
                  onChangeText={onChangeAmount}
                  right={<TextInput.Icon icon="cash" />}
                />
              )}
            />
            {errors.ves_exchange && <Text style={styles.inputError}>{errors.ves_exchange.message}</Text>}
          </View>
        }

        { watch('currency') == 'VES' &&
          <View style={styles.marginBottom}>
            <Text style={styles.labelPicker}>Cambio a USD</Text>
            <View style={styles.vesExchangeInput}>
              <Text style={styles.vesExchangeInputText}>{watch('amount') ?? 'Cambio a USD'}</Text>
            </View>
          </View>
        }

        <View style={styles.marginBottom}>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                label="Descripción"
                value={value}
                onChangeText={onChange}
                right={<TextInput.Icon icon="menu" />}
              />
            )}
          />
          {errors.description && <Text style={styles.inputError}>{errors.description.message}</Text>}
        </View>

        <Button
          style={styles.button}
          // onPress={handleSubmit(onSubmit)}
          onPress={() => { console.log(JSON.stringify(getValues(), null, 4)) }}
          icon="floppy"
          mode="contained"
          loading={isCreatingLoan}
        >
          Guardar
        </Button>
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
  },
  button: {
    marginTop: 20,
    paddingVertical: 3,
    borderRadius: 5
  },
  inputError: {
    fontSize: 12,
    marginTop: 5,
    color: MD3Colors.error50
  }
})

export default CreateLoanScreen