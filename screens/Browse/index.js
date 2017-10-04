/**
 * Created by ggoma on 12/23/16.
 */
import React from 'react'
import {Text, StyleSheet, View, ScrollView} from 'react-native'

export default () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.sv}>
        <Text style={styles.text}>Foo</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
  sv: {
    paddingTop: 72,
  },
})
