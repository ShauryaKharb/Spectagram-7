import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Pressable,
} from 'react-native'
import * as Google from 'expo-google-app-auth'
import firebase from 'firebase'
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize'

let customFont = {
  myFont: require('../assets/Fonts/myFont.ttf'),
}

export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      fontsLoaded: false,
      opacity: 1,
      pressed: false,
    }
  }

  loadFonts = async () => {
    await Font.loadAsync(customFont)
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this.loadFonts()
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true
        }
      }
    }
    return false
  }

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        )

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: 'dark',
                })
                .then(function (snapshot) {})
            }
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            // The email of the user's account used.
            var email = error.email
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential
            // ...
          })
      } else {
        console.log('User already signed-in Firebase.')
      }
    })
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '234804380780-8re8pjn4kkdl05qpv0ku8cqisbggl8us.apps.googleusercontent.com',
        iosClientId:
          '234804380780-fsscenieibk24jg3kt2bhja8d28nr9p3.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        this.onSignIn(result)
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      console.log(e.message)
      return { error: true }
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Text>LLOOAADDIINNGG</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/logo.png')}
            />
            <Text style={styles.appTitle}>SPECTAGRAM</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                { opacity: this.state.pressed ? 0 : this.state.opacity },
              ]}
              onPress={() => {
                this.signInWithGoogleAsync()
                this.setState({ pressed: true, opacity: 0 })
              }}
              onPressIn={() => {
                this.setState({ opacity: 0.2 })
              }}
              onPressOut={() => {
                this.setState({ opacity: 1 })
              }}
              disabled={this.state.pressed}
            >
              <Text style={styles.googleText}>Sign in with Google</Text>
            </Pressable>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#321',
    // marginLeft: RFValue(13),
    // marginRight: RFValue(13),
    // borderRadius: RFValue(30),
  },
  image: {
    resizeMode: 'contain',
    height: RFValue(200),
    width: RFValue(150),
  },
  appTitle: {
    fontSize: 35,
    fontWeight: '500',
    fontFamily: 'myFont',
    color: '#fff',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#213',
    // marginLeft: RFValue(13),
    // marginRight: RFValue(13),
    // borderRadius: RFValue(30),
  },
  button: {
    backgroundColor: '#44e',
    borderRadius: RFValue(10),
  },
  googleText: {
    fontSize: 23,
    padding: RFValue(10),
    fontFamily: 'myFont',
    color: '#fff',
  },
})
