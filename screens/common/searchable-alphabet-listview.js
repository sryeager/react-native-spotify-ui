// @flow

import React from 'react'
import {StyleSheet, Platform, View} from 'react-native'
import {StyledAlphabetListView} from '../common/alphabet-listview'
import debounce from 'lodash/debounce'
import {SearchBar} from '../common/searchbar'
export const LIST_HEADER_HEIGHT = Platform.OS === 'ios' ? 42 : 0

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

type Props = any

export class SearchableListView extends React.PureComponent<void, Props, void> {
  searchBar: any = null

  _performSearch = (text: string | Object) => {
    // Android clear button returns an object
    if (typeof text !== 'string') {
      return this.props.onSearch(null)
    }

    return this.props.onSearch(text)
  }

  // We need to make the search run slightly behind the UI,
  // so I'm slowing it down by 50ms. 0ms also works, but seems
  // rather pointless.
  performSearch = debounce(this._performSearch, 50)

  render() {
    return (
      <View style={styles.wrapper}>
        <SearchBar
          onChangeText={this.performSearch}
          // if we don't use the arrow function here, searchBar ref is null...
          onSearchButtonPress={() => this.searchBar.unFocus()}
          //ref={search => this.search = search}
        />
        <StyledAlphabetListView
          headerHeight={
            Platform.OS === 'ios'
              ? LIST_HEADER_HEIGHT + StyleSheet.hairlineWidth * 12
              : 0
          }
          hideSectionList={true}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="never"
          {...this.props}
        />
      </View>
    )
  }
}
