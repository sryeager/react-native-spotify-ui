// @flow

import React from 'react'
import {StyleSheet, View} from 'react-native'
import {SearchBar as Search} from 'react-native-elements'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: Colors.spaceGray,
    borderTopWidth: 0,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
})

type PropsType = {
  //ref?: any,
  style?: any,
  //placeholder?: string,
  onChangeText: string => any,
  //onSearchButtonPress: string => any,
}

export const SearchBar = (props: PropsType) => (
  <Search
    darkTheme
    onChangeText={props.onChangeText || null}
    containerStyle={styles.searchbar}
    inputStyle={styles.input}
    round={true}
    placeholder="Search"
  />
)
