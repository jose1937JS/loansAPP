import React,  { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker'
import { TextInput, MD2Colors, Button, MD3Colors, ActivityIndicator, HelperText, Divider, Chip } from 'react-native-paper';
import { useForm, Controller  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validationSchema } from '../validations'
import Modal from '../components/Modal'

import useLoan from '../hooks/loans';
import { DollarContext } from '../context/dollarContext';
import dayjs from 'dayjs';


function CreateLoanScreen({ navigation }) {
  const { createLoan, isLoading: isCreatingLoan } = useLoan();
  const { dollar, page, isDollarLoading, setDollarPrice, setMonitor, setPage } = useContext(DollarContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // Inicializar rateType con el valor de page del contexto
  const [rateType, setRateType] = useState(page || 'bcv');

  // Mapeo de rateType a monitor y page
  const getRateParams = (type) => {
    if (type === 'bcv') return { monitor: 'usd', page: 'bcv' };
    if (type === 'binance') return { monitor: 'binance', page: 'binance' };
    return { monitor: 'usd', page: 'bcv' };
  };

  const defaultValues = {
    name: '',
    amount: '',
    description: '',
    estimated_refund_date: '',
    currency: 'USD',
    ves_exchange: '0.00',
    rate: dollar,
    rate_type: page || 'bcv',
  };

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
  });

  // Sincroniza el formulario con los valores del contexto al montar/actualizar
  useEffect(() => {
    setValue('rate_type', page || 'bcv');
    setRateType(page || 'bcv');
    setValue('rate', dollar || 0);
  }, [page]);

  // Recalcular conversiones cuando cambie el precio en el contexto
  useEffect(() => {
    if (!dollar) return;
    setValue('rate', dollar);
    if (getValues('currency') === 'USD') {
      const amount = parseFloat(getValues('amount'));
      if (!isNaN(amount) && amount > 0) {
        const ves_exchange = (dollar * amount).toFixed(2);
        setValue('ves_exchange', ves_exchange);
      }
    } else {
      const vesAmount = parseFloat(getValues('ves_exchange'));
      if (!isNaN(vesAmount) && vesAmount > 0) {
        const usd_exchange = (vesAmount / dollar).toFixed(2);
        setValue('amount', usd_exchange);
      }
    }
  }, [dollar]);

  const onChangeRateType = (value) => {
    setValue('rate_type', value);
    setRateType(value);
    const params = getRateParams(value);
    // Actualiza el contexto para que el precio se obtenga globalmente
    setPage(params.page);
    setMonitor(params.monitor);
  };

  const onChangeAmount = (rawValue) => {
    const normalized = String(rawValue).replace(/,/g, '.');
    const value = parseFloat(normalized);
    if (isNaN(value)) {
      setValue('amount', '');
      setValue('ves_exchange', '');
      return;
    }
    if(getValues('currency') === 'USD') {
      const ves_exchange = (dollar * value).toFixed(2);
      setValue('amount', normalized);
      setValue('ves_exchange', ves_exchange);
    } else {
      const dollar_exchange = (value / dollar).toFixed(2);
      setValue('amount', dollar_exchange);
      setValue('ves_exchange', normalized);
    }
  };

  const onChangeDate = (selectedDate) => {
    setValue("estimated_refund_date", selectedDate);
    setShowDatePicker(false)
  };

  const onDismissModal = () => {
    setModalVisible(false)
  }

  const onSubmit = async (data) => {
    setData(data)
    setModalVisible(true)
  }

  const sendForm = async () => {
    await createLoan(data)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
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
          <Text style={styles.labelPicker}>Selecciona la moneda</Text>
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
                  placeholder={{ label: 'Moneda', value: null }}
                />
              )}
            />
          </View>
          {errors.currency && <HelperText type="error" visible>{errors.currency.message}</HelperText>}
        </View>

        <View style={styles.marginBottom}>
          <Text style={styles.labelPicker}>Selecciona el tipo de tasa</Text>
          <View style={styles.pickerStyle}>
            <Controller
              name="rate_type"
              control={control}
              render={({ field: { value } }) => (
                <RNPickerSelect
                  value={value}
                  onValueChange={onChangeRateType}
                  items={[
                    { value: 'binance', label: 'Binance' },
                    { value: 'bcv', label: 'BCV' },
                  ]}
                  placeholder={{ label: 'Tipo de tasa', value: null }}
                />
              )}
            />
          </View>
          {errors.rate_type && <HelperText type="error" visible>{errors.rate_type.message}</HelperText>}
          <View style={styles.rateRow}>
            <Chip icon="currency-usd" mode="flat" compact>{rateType === 'bcv' ? 'BCV' : 'Binance'}</Chip>
            {isDollarLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.rateTypeText}>1 USD = {dollar} VES</Text>
            )}
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
                  value={String(value)}
                  onChangeText={onChangeAmount}
                  right={<TextInput.Icon icon="cash" />}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                />
              )}
            />
            {errors.amount && <HelperText type="error" visible>{errors.amount.message}</HelperText>}
          </View>
        }

        { watch('currency') == 'USD' &&
          <View style={styles.marginBottom}>
            <Text style={styles.labelPicker}>Cambio a VES</Text>
            <View style={styles.vesExchangeInput}>
              <Text style={styles.vesExchangeInputText}>{watch('ves_exchange') ?? 'Cambio a VES'}</Text>
              { isDollarLoading && <ActivityIndicator size="small"  /> }
            </View>
            {errors.ves_exchange && <HelperText type="error" visible>{errors.ves_exchange.message}</HelperText>}
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
                  value={String(value)}
                  onChangeText={onChangeAmount}
                  right={<TextInput.Icon icon="cash" />}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                />
              )}
            />
            {errors.ves_exchange && <HelperText type="error" visible>{errors.ves_exchange.message}</HelperText>}
          </View>
        }

        { watch('currency') == 'VES' &&
          <View style={styles.marginBottom}>
            <Text style={styles.labelPicker}>Cambio a USD</Text>
            <View style={styles.vesExchangeInput}>
              <Text style={styles.vesExchangeInputText}>{watch('amount') ?? 'Cambio a USD'}</Text>
              { isDollarLoading && <ActivityIndicator size="small"  /> }
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

        <View style={styles.marginBottom}>
          <Button
            style={styles.outlinedButton}
            onPress={() => setShowDatePicker(true)}
            uppercase={false}
            mode="outlined"
          >
            <Text style={{ color: MD2Colors.grey700 }}>
              { Boolean(watch('estimated_refund_date'))
              ? dayjs(watch('estimated_refund_date')).format('LL')
              : 'Selecciona la fecha estimada de devolución' }
            </Text>
          </Button>
          {errors.estimated_refund_date && <Text style={styles.inputError}>{errors.estimated_refund_date.message}</Text>}
        </View>

        <DatePicker
          modal
          open={showDatePicker}
          date={
            watch('estimated_refund_date')
            ? new Date(watch('estimated_refund_date'))
            : new Date()
          }
          onConfirm={onChangeDate}
          onCancel={() => setShowDatePicker(false) }
          confirmText="Confirmar"
          cancelText='Cancelar'
          title='Seleccciona una fecha'
          mode='date'
        />

        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          // onPress={console.log("DATA", JSON.stringify(getValues(), null, 4))}
          icon="floppy"
          mode="contained"
        >
          Guardar
        </Button>

        {/* MODAL */}
        <Modal
          onDismiss={onDismissModal}
          visible={modalVisible}
        >
          <View>
              <Text style={styles.h3Text}>Resumen de la operación</Text>
              <Divider style={{ marginBottom: 10 }} />
            <View style={styles.tableContainer}>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Nombre</Text>
                <Text style={styles.resumeTitleText}>{ getValues('name') }</Text>
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Préstamo</Text>

                { getValues('currency') == 'USD'
                  ? <Text style={styles.resumeTitleText}>{ getValues('amount') } { getValues('currency') }</Text>
                  : <Text style={styles.resumeTitleText}>{ getValues('ves_exchange') } { getValues('currency') }</Text> }
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Monto al cambio</Text>
                {
                  getValues('currency') == 'USD' ?

                  <Text style={styles.resumeTitleText}>
                    { getValues('ves_exchange') } VES
                  </Text>

                  :

                  <Text style={styles.resumeTitleText}>
                    { getValues('amount') } USD
                  </Text>
                }
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Tipo de Tasa</Text>
                <Text style={styles.resumeTitleText}>{ getValues('rate_type') == 'bcv' ? 'BCV' : 'Binance' }</Text>
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Tasa</Text>
                <Text style={styles.resumeTitleText}>{ getValues('rate') } VES</Text>
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Descripción</Text>
                <Text style={styles.resumeTitleText}>{ getValues('description') }</Text>
              </View>

              <View style={styles.tableContainerItem}>
                <Text style={[styles.resumeTitleText, styles.bold]}>Fecha estimada de devolución</Text>
                <Text style={styles.resumeTitleText}>{ dayjs(getValues('estimated_refund_date')).format('YYYY-MM-DD') }</Text>
              </View>

            </View>

            <View style={styles.modalButtonsContainer}>
              <Button onPress={() => setModalVisible(false)}>
                Cancelar
              </Button>
              <Button
                onPress={sendForm}
                loading={isCreatingLoan}
              >
                Aceptar
              </Button>
            </View>
          </View>
        </Modal>
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
  tableContainer: {
    borderWidth: 0.3,
    borderBottomWidth: 0,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20
  },
  rateTypeText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right'
  },
  rateRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  resumeTitleText: {
    width: '50%',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bold: {
    fontWeight: 'bold'
  },
  tableContainerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  h1Text: {
    fontSize: 28,
    marginBottom: 50,
    color: 'black',
    fontWeight: 'bold'
  },
  h3Text: {
    fontSize: 24,
    marginBottom: 30,
    color: 'black',
    textAlign: 'center'
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
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: MD2Colors.grey700,
    justifyContent: 'space-between'
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
  outlinedButton: {
    paddingVertical: 3,
    borderRadius: 5,
    borderColor: MD2Colors.grey700
  },
  inputError: {
    fontSize: 12,
    marginTop: 5,
    color: MD3Colors.error50
  }
})

export default CreateLoanScreen