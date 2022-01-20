import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

import Feed from '../screens/Feed'
import CreatePost from '../screens/CreatePost'

export default class TabNavigator extends React.Component {
  render() {
    var Tab = createMaterialBottomTabNavigator()

    return (
      <Tab.Navigator
        labeled={false}
        barStyle={styles.barStyle}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Feed') {
              iconName = focused ? 'book' : 'book-outline'
            } else if (route.name === 'CreatePost') {
              iconName = focused ? 'create' : 'create-outline'
            }
            return (
              <Ionicons
                style={styles.icon}
                name={iconName}
                size={RFValue(25)}
                color={color}
              />
            )
          },
        })}
        activeColor={'tomato'}
        inactiveColor={'white'}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="CreatePost" component={CreatePost} />
        {/* <Tab.Screen name="Feed" component={Feed} /> */}
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barStyle: {
    backgroundColor: '#000',
    height: '8%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  icon: {
    width: RFValue(25),
    height: RFValue(25),
  },
})
