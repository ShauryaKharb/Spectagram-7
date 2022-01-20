import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'

export default class PostScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      theme: null,
    }
  }

  fetchUser = async () => {
    let theme
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme
      })
    this.setState({
      theme: theme,
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor:
                this.state.theme === 'light' ? '#ff4ff0' : '#000',
            },
          ]}
        >
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/profile_img.png')}
              style={styles.profileImage}
            />
            <Text
              style={[
                styles.authorName,
                { color: this.state.theme === 'light' ? '#000' : '#fff' },
              ]}
            >
              {this.props.route.params.xyz.author}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/post.jpeg')}
              style={styles.image}
            />
            <ScrollView>
              <Text
                style={[
                  styles.caption,
                  { color: this.state.theme === 'light' ? '#000' : '#fff' },
                ]}
              >
                {this.props.route.params.xyz.caption}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.likeButtonContainer}>
            <View style={styles.likeButton}>
              <Ionicons
                name={'heart'}
                size={RFValue(20)}
                color={'#fff'}
                style={styles.icon}
              />
              <Text style={styles.likeText}>
                {this.props.route.params.xyz.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#46c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    flex: 1,
    marginLeft: RFValue(13),
    marginRight: RFValue(13),
    borderRadius: RFValue(20),
  },
  profileContainer: {
    flex: 0.05,
    flexDirection: 'row',
    // backgroundColor: '#000',
    borderRadius: RFValue(30),
    alignItems: 'center',
    padding: RFValue(15),
  },
  profileImage: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    borderRadius: 1000,
    // backgroundColor: 'pink',
  },
  authorName: {
    color: '#fff',
    paddingLeft: RFValue(10),
    fontSize: RFValue(15),
    width: '100%',
  },
  contentContainer: {
    flex: 0.85,
    // backgroundColor: '#fff',
    borderRadius: RFValue(30),
  },
  image: {
    resizeMode: 'contain',
    height: RFValue(250),
    width: RFValue(250),
    alignSelf: 'center',
    borderRadius: 15,
    padding: RFValue(10),
  },
  caption: {
    color: '#fff',
    padding: RFValue(20),
    textAlign: 'left',
    fontSize: RFValue(15),
  },
  likeButtonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(50),
    // backgroundColor: '#e0c',
  },
  likeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    backgroundColor: 'red',
    borderRadius: RFValue(100),
  },
  icon: {
    // paddingLeft: '30%',
  },
  likeText: {
    padding: RFValue(10),
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(16),
  },
})
