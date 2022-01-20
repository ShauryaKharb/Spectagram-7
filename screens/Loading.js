import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'

export default class Loading extends React.Component {
  checkIfLogedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Dashboard')
      } else {
        this.props.navigation.navigate('Login')
      }
    })
  }

  componentDidMount() {
    this.checkIfLogedIn()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Loading.......</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})
