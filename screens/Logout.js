import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'

export default class Logout extends React.Component {
  checkIfLogedIn = () => {
    firebase.auth().signOut()
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
