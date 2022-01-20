import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from './screens/Loading'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Feed from './screens/Feed'
import { firebaseConfig } from './config'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const AppNavigator = createSwitchNavigator({
  LoadingScreen: Loading,
  Login: Login,
  Dashboard: Dashboard,
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

// VI COMMAND ==>>  openssl rand -base64 32 | openssl sha1 -c
// execute it in ==>> Program Files/Git/usr/bin
