import React, {Component} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';
import {uploadImage} from '../aws/s3';
import Spinner from 'react-native-loading-spinner-overlay';

class Photo extends Component {

  constructor(props) {
    super(props);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload() {
    const {state, setParams} = this.props.navigation;
    const localCache = 'file:///data/user/0/com.rnplayground/cache/IMG_';
    setParams({loading: true});
    store.get('user').then((user) => {
      if (state.params.path === 'https://s3.amazonaws.com/marcussmithtestbucket/image-not-found.jpg') {
        setParams({loading: false});
        return Alert.alert('No picture found');
      }
      const imageName = state.params.path.slice(localCache.length);
      const uid = user.uid;
      uploadImage(user.identidy, state.params.path, imageName, uid)
      .then(result => {
        setParams({path: 'https://s3.amazonaws.com/marcussmithtestbucket/image-not-found.jpg', loading: false})
      }).catch(err => {
        Alert.alert('No picture found');
        setParams({path: 'https://s3.amazonaws.com/marcussmithtestbucket/image-not-found.jpg', loading: false})
      })
    })
  }

  handleSettings() {
    const {navigate} = this.props.navigation;
    store.get('user').then((user) => {
      const getPictureQuery = `https://graph.facebook.com/v2.3/${user.fb.userId}/picture?width=400&redirect=false&access_token=${user.fb.token}`;
      const getNameAndEmailQuery = `https://graph.facebook.com/v2.3/${user.fb.userId}?fields=name&access_token=${user.fb.token}`;
      fetch(getPictureQuery).then((pictureResponse) => fetch(getNameAndEmailQuery).then((dataResponse) => {
        pictureResponse.json().then((picture) => dataResponse.json().then((data) => {
          navigate('Settings', {
            picture: picture.data.url,
            name: data.name
          });
        }));
      }));
    });
  }

  render() {
    const {navigate, state} = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0088cc',
        padding: 5
      }}>
        {state.params && state.params.path && <Image style={{
          margin: 10,
          flex: 6,
          height: '100%',
          width: '100%',
          flexDirection: 'row'
        }} source={{
          uri: state.params.path
        }}/>}
        <View style={{
          width: '100%',
          height: '100%',
          padding: 10,
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}>
          <Icon.Button name="camera" backgroundColor="#0088cc" onPress={() => navigate('Capture')}>
            <Text style={{
              fontFamily: 'Arial',
              fontSize: 18,
              textAlign: 'center',
              color: 'white'
            }}>
              TAKE PICTURE
            </Text>
          </Icon.Button>
        </View>
        <View style={{
          width: '100%',
          height: '100%',
          padding: 10,
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}>
          <Spinner visible={state.params ? state.params.loading : false} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <Icon.Button name="upload" backgroundColor="#0088cc" onPress={() => state.params ? this.handleUpload() : null}>
            <Text style={{
              fontFamily: 'Arial',
              fontSize: 18,
              color: 'white'
            }}>
              UPLOAD PICTURE
            </Text>
          </Icon.Button>
        </View>
        <View style={{
          width: '100%',
          height: '100%',
          padding: 10,
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}>
          <Icon.Button name="gear" backgroundColor="#0088cc" onPress={this.handleSettings}>
            <Text style={{
              fontFamily: 'Arial',
              flex: 1,
              fontSize: 18,
              color: 'white'
            }}>
              SETTINGS
            </Text>
          </Icon.Button>
        </View>
      </View>
    );
  }
}

export default Photo;
