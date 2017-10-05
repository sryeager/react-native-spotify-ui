import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import Header from '../common/header'
import {TOGETHER} from '../common/footer'

export default () => {
  return (
    <View style={styles.container}>
      <View style={{height: TOGETHER}} />
      <Header name="LIBRARY" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
