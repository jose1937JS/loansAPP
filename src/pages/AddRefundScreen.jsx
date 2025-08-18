import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button, TextInput, HelperText, MD2Colors, ActivityIndicator, Chip } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RNPickerSelect from 'react-native-picker-select';
import { DollarContext } from '../context/dollarContext';
import useRefund from '../hooks/refunds';
import { refundSchema } from '../validations';

export default function AddRefundScreen({ navigation, route }) {
  const { loan } = route.params || {};
  const { dollar, page, isDollarLoading } = useContext(DollarContext);
  const { createRefund, isLoading } = useRefund();

  const defaultValues = useMemo(() => ({
    amount: '',
    ves_exchange: '',
    currency: 'USD',
    loan_id: loan?.id,
    rate: dollar,
  }), [loan?.id, dollar]);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(refundSchema),
  });

  const onChangeAmount = (rawValue) => {
    const normalized = String(rawValue).replace(/,/g, '.');
    const value = parseFloat(normalized);
    if (isNaN(value)) {
      setValue('amount', '');
      setValue('ves_exchange', '');
      return;
    }
    if (watch('currency') === 'USD') {
      setValue('amount', normalized);
      setValue('ves_exchange', (value * dollar).toFixed(2));
    } else {
      setValue('ves_exchange', normalized);
      setValue('amount', (value / dollar).toFixed(2));
    }
  };

  const onSubmit = async (data) => {
    await createRefund(data);
    navigation.goBack();
  };

  const remainingAmount = loan?.remaining_amount ?? 0;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.h1Text}>Nuevo reembolso</Text>

        <View style={styles.headerRate}>
          <Chip icon="bank">{page === 'bcv' ? 'BCV' : 'Binance'}</Chip>
          {isDollarLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.headerRateText}>1 USD = {dollar} VES</Text>
          )}
        </View>

        <Text style={styles.remainingText}>Deuda restante: {remainingAmount} USD</Text>

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
                    { value: 'USD', label: 'USD' },
                    { value: 'VES', label: 'VES' },
                  ]}
                  placeholder={{ label: 'Moneda', value: null }}
                />
              )}
            />
          </View>
          {errors.currency && <HelperText type="error" visible>{errors.currency.message}</HelperText>}
        </View>

        {watch('currency') === 'USD' && (
          <View style={styles.marginBottom}>
            <Controller
              name="amount"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  label="Monto en USD"
                  value={String(value)}
                  onChangeText={onChangeAmount}
                  right={<TextInput.Icon icon="currency-usd" />}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                />
              )}
            />
            {errors.amount && <HelperText type="error" visible>{errors.amount.message}</HelperText>}
          </View>
        )}

        {watch('currency') === 'USD' && (
          <View style={styles.marginBottom}>
            <Text style={styles.label}>Cambio a VES</Text>
            <View style={styles.exchangeBox}>
              <Text style={styles.exchangeText}>{watch('ves_exchange') || '0.00'}</Text>
              {isDollarLoading && <ActivityIndicator size="small" />}
            </View>
            {errors.ves_exchange && <HelperText type="error" visible>{errors.ves_exchange.message}</HelperText>}
          </View>
        )}

        {watch('currency') === 'VES' && (
          <View style={styles.marginBottom}>
            <Controller
              name="ves_exchange"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  label="Monto en VES"
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
        )}

        {watch('currency') === 'VES' && (
          <View style={styles.marginBottom}>
            <Text style={styles.label}>Cambio a USD</Text>
            <View style={styles.exchangeBox}>
              <Text style={styles.exchangeText}>{watch('amount') || '0.00'}</Text>
              {isDollarLoading && <ActivityIndicator size="small" />}
            </View>
          </View>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || remainingAmount <= 0}
          loading={isLoading}
          icon="content-save"
        >
          Guardar reembolso
        </Button>

        {remainingAmount <= 0 && (
          <HelperText type="info" visible style={{ textAlign: 'center' }}>
            Este préstamo ya está completamente pagado.
          </HelperText>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  h1Text: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  headerRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerRateText: {
    fontSize: 14,
    color: MD2Colors.grey800,
  },
  remainingText: {
    marginBottom: 20,
    fontSize: 14,
  },
  marginBottom: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
  },
  labelPicker: {
    marginBottom: 5,
    fontSize: 13
  },
  exchangeBox: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: MD2Colors.grey700,
    justifyContent: 'space-between',
  },
  exchangeText: {
    fontSize: 17,
    color: MD2Colors.grey800,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  pickerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: MD2Colors.grey700
  },
});


