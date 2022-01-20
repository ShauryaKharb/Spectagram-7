import React from 'react'
import { StyleSheet, Text, View, Image, Switch } from 'react-native'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize'

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      theme: null,
      name: 'Loading Name',
      image: '',
      isEnabled: false,
      emoji: null,
    }
  }

  toggleSwitch() {
    this.fetchUser()
    let theme = this.state.isEnabled ? 'light' : 'dark'
    let isEnabled = this.state.isEnabled
    let emoji = this.state.isEnabled ? '🌞' : '🌜'

    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .update({ current_theme: theme })
    this.setState({ isEnabled: !isEnabled, emoji: emoji })
  }

  fetchUser = async () => {
    let image = '',
      name = 'Loading Name',
      theme
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`
        image = snapshot.val().profile_picture
      })
    this.setState({
      theme: theme,
      name: name,
      image: image,
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.theme === 'light' ? '#fff' : '#000' },
        ]}
      >
        <View style={styles.first}>
          <Image
            source={
              this.state.image === ''
                ? require('../assets/profile_img.png')
                : { uri: this.state.image }
            }
            style={styles.image}
          />
        </View>
        <View style={styles.second}>
          <Text style={styles.name}>{this.state.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.emoji}>{this.state.emoji}</Text>
            <Switch
              style={styles.switch}
              onValueChange={() => this.toggleSwitch()}
              value={this.state.isEnabled}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  first: {
    flex: 0.4,
    // backgroundColor: '#7e4',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  second: {
    flex: 0.6,
    // backgroundColor: '#fed',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: RFValue(100),
    width: RFValue(100),
    borderRadius: RFValue(200),
    marginBottom: RFValue(20),
  },
  switch: {
    marginLeft: RFValue(20),
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  emoji: {
    fontSize: RFValue(30),
  },
  name: {
    margin: RFValue(20),
    fontSize: 25,
  },
})
