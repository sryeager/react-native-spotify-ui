// @flow

import React, {Component} from 'react'
import {Text, Image, View, Platform, StyleSheet} from 'react-native'
import Header from '../common/header'
import {TOGETHER} from '../common/footer'
import {SearchableListView} from '../common/searchable-alphabet-listview'
import {Row, Column} from '../common/layout'
import {
  Detail,
  Title,
  ListRow,
  ListSectionHeader,
  ListSeparator,
} from '../common/list'
import delay from 'delay'
import type {WordType} from './types'
import type {TopLevelViewPropsType} from '../types'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import uniq from 'lodash/uniq'
import words from 'lodash/words'
import deburr from 'lodash/deburr'
import * as defaultData from '../../data/music.json'
import Colors from '../../constants/Colors'
import * as c from '../common/colors'
import {Ionicons} from 'react-native-vector-icons'

const ROW_HEIGHT = Platform.OS === 'ios' ? 60 : 89
const SECTION_HEADER_HEIGHT = Platform.OS === 'ios' ? 33 : 41

const splitToArray = (str: string) => words(deburr(str.toLowerCase()))

const songToArray = (song: WordType) =>
  uniq([...splitToArray(song.artistName), ...splitToArray(song.name)])

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    backgroundColor: Colors.spaceGray,
  },
  rowSectionHeader: {
    height: SECTION_HEADER_HEIGHT,
    backgroundColor: c.gray,
  },
  rowTitleItem: {
    color: c.white,
  },
  rowDetailText: {
    fontSize: 14,
    color: c.white,
  },
  container: {
    flex: 1,
    backgroundColor: c.black,
  },
  searchWrapper: {
    height: 20,
    backgroundColor: Colors.spaceGray,
  },
  image: {
    width: 45,
    marginRight: 10,
  },
  emptySearch: {
    flex: 1,
    top: -150,
    alignItems: 'center',
  },
  emptySearchText: {
    fontSize: 18,
    color: c.white,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  emptySearchDetailText: {
    fontSize: 11,
    color: c.iosGray,
    textAlign: 'center',
    marginHorizontal: 40,
  },
})

type Props = TopLevelViewPropsType

type State = {
  results: {[key: string]: Array<WordType>},
  allSongs: Array<WordType>,
  refreshing: boolean,
};

export default class SearchView extends React.PureComponent<
  void,
  Props,
  State,
> {
  state = {
    results: null,
    allSongs: defaultData.data,
    refreshing: false,
  }

  componentWillMount() {
    this.fetchData()
  }

  refresh = async () => {
    const start = Date.now()
    this.setState(() => ({refreshing: true}))

    await this.fetchData()

    // wait 0.5 seconds – if we let it go at normal speed, it feels broken.
    const elapsed = Date.now() - start
    if (elapsed < 500) {
      await delay(500 - elapsed)
    }

    this.setState(() => ({refreshing: false}))
  }

  fetchData = async () => {
    let allSongs = defaultData.data

    this.setState(() => ({allSongs}))
  }

  // onPressRow = (data: WordType) => {
  //   this.props.navigation.navigate('DictionaryDetailView', {item: data})
  // }

  renderRow = ({item}: {item: WordType}) => (
    <ListRow
      //onPress={() => this.onPressRow(item)}
      contentContainerStyle={styles.row}
      arrowPosition="none"
    >
      <Row>
        <Image source={{uri: item.artworkUrl100}} style={styles.image} />
        <Column>
          <Title style={styles.rowTitleItem} lines={1}>
            {item.name}
          </Title>
          <Detail lines={2} style={styles.rowDetailText}>
            {item.artistName}
          </Detail>
        </Column>
      </Row>
    </ListRow>
  )

  renderSectionHeader = ({title}: {title: string}) => (
    <ListSectionHeader title={title} style={styles.rowSectionHeader} />
  )

  renderSeparator = (sectionId: string, rowId: string) => (
    <ListSeparator key={`${sectionId}-${rowId}`} />
  )

  performSearch = (text: ?string) => {
    if (!text) {
      this.setState(state => ({results: null}))
      return
    }

    const query = text.toLowerCase()
    this.setState(state => ({
      results: state.allSongs.filter(song =>
        songToArray(song).some(song => song.startsWith(query)),
      ),
    }))
  }

  render() {
    const emptyNotice = !this.state.results ? (
      <View style={styles.emptySearch}>
        <Ionicons name="ios-search" color={c.iosGray} size={74} />
        <Text style={styles.emptySearchText}>Search Spotify</Text>
        <Text style={styles.emptySearchDetailText}>Find your favorite songs, artists,</Text>
        <Text style={styles.emptySearchDetailText}>albums, podcasts & videos, playlists</Text>
        <Text style={styles.emptySearchDetailText}>and friends.</Text>
      </View>
    ) : null

    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper} />
        <SearchableListView
          cell={this.renderRow}
          cellHeight={
            ROW_HEIGHT +
            (Platform.OS === 'ios' ? 11 / 12 * StyleSheet.hairlineWidth : 0)
          }
          data={groupBy(this.state.results, item => item.collectionName)}
          onSearch={this.performSearch}
          renderSeparator={this.renderSeparator}
          sectionHeader={this.renderSectionHeader}
          sectionHeaderHeight={SECTION_HEADER_HEIGHT}
        />
        {emptyNotice}
      </View>
    )
  }
}
