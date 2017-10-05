import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import Header from '../common/header'
import PlayList from '../common/playlist'
import img from '../common/imgs'
import {TOGETHER} from '../common/footer'

export default class Home extends Component {
  state = {
    playlists: this.generatePlaylists(img, 5),
  }

  title = [
    'Just For You',
    'Recently Played',
    'Inspired by your Recent Listening',
    'New Music Friday!',
  ]

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate in home')
    return true
  }

  generatePlaylists(array, size) {
    // avoid mutating the array
    let p = array.slice()

    let results = []
    while (p.length) {
      results.push(p.splice(0, size))
    }
    return results
  }

  renderPlaylists() {
    return this.state.playlists.map((playlist, i) => {
      if (i == 1)
        return (
          <PlayList title={this.title[i]} items={playlist} key={i} circle />
        )
      return <PlayList title={this.title[i]} items={playlist} key={i} />
    })
  }

  render() {
    console.log(this.state.playlists)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
          {this.renderPlaylists()}
        </ScrollView>
        {/*for the gap*/}
        <View style={{height: TOGETHER}} />
        <Header name="HOME" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollview: {
    paddingTop: 72,
  },
})
