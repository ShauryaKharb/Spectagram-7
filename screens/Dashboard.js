import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from '../navigation/DrawerNavigation'

export default class Dashboard extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    )
  }
}

// VI COMMAND ==>>  openssl rand -base64 32 | openssl sha1 -c
// execute it in ==>> Program Files/Git/usr/bin
