// @flow

import React from 'react'
import {StyleSheet} from 'react-native'
import AlphabetListView from 'react-native-alphabetlistview'
import * as c from './colors'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
  listView: {
    backgroundColor: Colors.spaceGray,
  },
  sectionItems: {
    alignItems: 'center',
    right: 3,
  },
})

export function StyledAlphabetListView(props: Object) {
  return (
    <AlphabetListView
      contentContainerStyle={styles.listView}
      sectionListStyle={styles.sectionItems}
      initialListSize={StyledAlphabetListView.initialListSize}
      pageSize={StyledAlphabetListView.pageSize}
      {...props}
    />
  )
}
StyledAlphabetListView.initialListSize = 12
StyledAlphabetListView.pageSize = 8
