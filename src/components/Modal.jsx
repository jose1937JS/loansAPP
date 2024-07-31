import React from 'react'
import { StyleSheet } from 'react-native'
import { Modal as ModalPaper, Portal } from 'react-native-paper'

export default function Modal({ visible, onDismiss, children }) {
  return (
    <Portal>
      <ModalPaper
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.containerStyle}
      >
        {children}
      </ModalPaper>
    </Portal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    alignSelf: 'center'
  }
})
