import React from 'react'
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import {ROUTES} from './screens/routes'
import {Navigator} from 'react-native-deprecated-custom-components'
import {FontAwesome} from 'react-native-vector-icons'
import TabBarNavigation from './screens/common/tab-bar-navigation'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import Footer from './screens/common/footer'

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name]

    return <Component route={route} navigator={navigator} />
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return {
      ...CustomNavigatorSceneConfigs.FloatFromRight,
      gestures: {},
    }
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
        <Navigator
          ref={ref => (this.navigator = ref)}
          getRef={ref => (this.navigator = ref)}
          initialRoute={{name: 'Home'}}
          renderScene={this.renderScene}
          configureScene={route => ({
            ...Navigator.SceneConfigs.VerticalDownSwipeJump,
            gestures: false,
          })}
          style={styles.container}
        />
        <Footer
          ref="footer"
          hide={() => this.refs.tab.hide()}
          show={() => this.refs.tab.show()}
          hideTabBarNavigation={v => this.refs.tab.setHeight(v)}
        />
        <TabBarNavigation context={this} ref="tab" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
