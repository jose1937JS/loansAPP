import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card, Button, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

function Loans({ item }) {
  const navigation = useNavigation()

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Text
          size={72}
          label="50%"
          labelStyle={styles.percent}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {`${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(item.amount)}`} <Text style={styles.tinyText}>USD</Text>
          </Text>
          <Text style={[styles.subtitle, { marginBottom: 3 }]}>
            {item.name}
          </Text>
          <Text style={styles.subtitle}>
            {dayjs(item.created_at).format('LL')}
          </Text>
        </View>
      </Card.Content>

      <View style={styles.footer}>
        <Button
          onPress={() => navigation.navigate('LoanDetailScreen')}
          mode="text"
          contentStyle={styles.button}
        >
          Detalles
        </Button>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 15
  },
  title: {
    fontSize: 32,
    lineHeight: 50,
  },
  subtitle: {
    color: 'grey',
  },
  footer: {
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 5,
  },
  percent: {
    fontSize: 22
  },
  tinyText: {
    fontSize: 14
  }
})

export default Loans