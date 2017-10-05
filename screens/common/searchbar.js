// @flow

import React from 'react'
import {StyleSheet} from 'react-native'
import NativeSearchBar from 'react-native-search-bar'

export const silver = '#DDDDDD'

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: silver,
    height: 44,
  },
})

type PropsType = {
  getRef?: any,
  style?: any,
  placeholder?: string,
  onChangeText: string => any,
  onSearchButtonPress: string => any,
}

export const SearchBar = (props: PropsType) => (
  <NativeSearchBar
    ref={props.getRef}
    style={styles.searchbar}
    hideBackground={true}
    placeholder={props.placeholder || 'Search'}
    onChangeText={props.onChangeText || null}
    onSearchButtonPress={props.onSearchButtonPress || null}
  />
)
