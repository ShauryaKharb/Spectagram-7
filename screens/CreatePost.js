import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { RFValue } from 'react-native-responsive-fontsize'
import firebase from 'firebase'

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      priview_image: 'image2',
      caption: '',
      dropDownHeight: 0.4,
      theme: null,
    }
  }

  async fetchUser() {
    var theme
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
    let priview_images = {
      image1: require('../assets/image_1.jpg'),
      image2: require('../assets/image_2.jpg'),
      image3: require('../assets/image_3.jpg'),
      image4: require('../assets/image_4.jpg'),
      image5: require('../assets/image_5.jpg'),
      image6: require('../assets/image_6.jpg'),
      image7: require('../assets/image_7.jpg'),
    }
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                this.state.theme === 'light'
                  ? '#fff'
                  : this.state.theme === 'dark'
                  ? '#801'
                  : 'transparent',
            },
          ]}
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.imageContainer}>
            <Text style={styles.loadingText}>Loading Image</Text>
            <Image
              source={priview_images[this.state.priview_image]}
              style={styles.priview_image}
            />
          </View>
          <View
            style={[
              styles.dropDownContainer,
              { flex: RFValue(this.state.dropDownHeight) },
            ]}
          >
            <DropDownPicker
              items={[
                { label: 'Image 1', value: 'image1' },
                { label: 'Image 2', value: 'image2' },
                { label: 'Image 3', value: 'image3' },
                { label: 'Image 4', value: 'image4' },
                { label: 'Image 5', value: 'image5' },
                { label: 'Image 6', value: 'image6' },
                { label: 'Image 7', value: 'image7' },
              ]}
              containerStyle={{
                height: RFValue(45),
                width: '100%',
              }}
              style={[styles.dropDownPicker]}
              defaultValue={this.state.priview_image}
              onOpen={() => {
                this.setState({ dropDownHeight: 1 })
              }}
              onClose={() => {
                this.setState({ dropDownHeight: 0.3 })
              }}
              onChangeItem={(x) => {
                this.setState({ priview_image: x.value })
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{
                color: '#000',

                // fontFamily: 'myFont',
              }}
              arrowStyle={{
                color: '#000',

                // fontFamily: 'myFont',
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor:
                    this.state.theme === 'light'
                      ? '#000'
                      : this.state.theme === 'dark'
                      ? '#fff'
                      : 'transparent',
                  color:
                    this.state.theme === 'light'
                      ? '#000'
                      : this.state.theme === 'dark'
                      ? '#fff'
                      : 'transparent',
                },
              ]}
              placeholder="Captions"
              placeholderTextColor={
                this.state.theme === 'light'
                  ? '#000'
                  : this.state.theme === 'dark'
                  ? '#fff'
                  : 'transparent'
              }
              multiline={true}
              numberOfLines={10}
              onChangeText={(x) => {
                this.setState({ caption: x })
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(30),
  },
  loadingText: {
    justifyContent: 'center',
    alignSelf: 'center',
    // textAlignVertical: 'center',
    // textAlign: 'center',
    // padding: RFValue(10),
    paddingTop: '30%',
    // backgroundColor: '#44c',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '5%',
    // backgroundColor: '#56c',
    borderRadius: RFValue(30),
    marginLeft: RFValue(15),
    marginRight: RFValue(15),
  },
  priview_image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    marginTop: '-30%',
    // backgroundColor: '#376',
    borderRadius: RFValue(20),
  },
  dropDownContainer: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: RFValue(15),
    marginRight: RFValue(15),
    // backgroundColor: '#000',
    borderRadius: RFValue(30),
    paddingTop: RFValue(30),
  },
  dropDownPicker: {
    borderWidth: 3,
    borderRadius: RFValue(10),
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flex: 1.7,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#93a',
    borderRadius: RFValue(30),
    marginLeft: RFValue(15),
    marginRight: RFValue(15),
  },
  textInput: {
    height: RFValue(45),
    width: '100%',
    borderWidth: RFValue(2),
    marginTop: RFValue(20),
    paddingLeft: RFValue(10),
    borderRadius: RFValue(10),
    textAlignVertical: 'center',
  },
})
