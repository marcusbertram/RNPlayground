import React, {Component} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import Sound from 'react-native-sound'

class Details extends Component {

  constructor(props) {
    super(props);
    this.handleSound = this.handleSound.bind(this);
  }

  handleSound() {
    const {state} = this.props.navigation;
    if (state.params.pollySetence === 'No labels found') {
      return Alert.alert(state.params.pollySetence);
    }
    let mp3url = 'https://s3.amazonaws.com/marcussmithtestbucket/' + state.params.uid + '/' + state.params.id
    const url = mp3url.slice(0, -4) + '.mp3';
    RNFetchBlob.config({fileCache: true}).fetch('GET', url, {}).then((res) => {
      const sound = new Sound(res.path(), '', (error) => {
        if (error) {}
      });
      setTimeout(() => {
        sound.play((success) => {
          if (success) {} else {}
        });
      }, 100);
    });
  }

  render() {
    const {navigate, state} = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#0088cc'
      }}>
        <Image style={{
          margin: 10,
          height: 450,
          width: '100%'
        }} source={{
          uri: 'https://s3.amazonaws.com/marcussmithtestbucket/' + state.params.uid + '/' + state.params.id
        }}/>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: '100%',
        }}>
          <Icon.Button name="music" backgroundColor="#FFFFFF" borderColor="#AAAAAA" color="#0088cc" onPress={() => this.handleSound()}>
            <Text style={{
              fontFamily: 'Arial',
              fontSize: 18,
              color: '#0088cc'
            }}>
              PLAY SOUND
            </Text>
          </Icon.Button>
        </View>
      </View>
    );
  }
}

export default Details;
