import React from 'react'
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import {FontAwesome} from 'react-native-vector-icons'

import Main from './screens/main'

import cacheAssetsAsync from './utilities/cacheAssetsAsync'

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/exponent-wordmark.png')],
        fonts: [
          FontAwesome.font,
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
        ],
      })
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.',
      )
      console.log(e.message)
    } finally {
      this.setState({appIsReady: true})
    }
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <View>
          <Text>Loading…</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Main />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
