import React from 'react'
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

function Header() {
  return (
    <Appbar.Header elevated dark style={styles.header}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200EE'
  }
})

export default Header