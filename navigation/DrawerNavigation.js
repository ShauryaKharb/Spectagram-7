import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import StackNavigator from './StackNavigator'
import Profile from '../screens/Profile'
import Logout from '../screens/Logout'

const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        screenOptions={() => ({
          drawerType: 'permanent',
        })}
      >
        {/* <Drawer.Screen name="Home" component={StackNavigator} /> */}
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    )
  }
}
