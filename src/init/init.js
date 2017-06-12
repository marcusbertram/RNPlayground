import React, {Component} from 'react';
import {View, Image, Animated, Easing, Alert} from 'react-native';
import store from 'react-native-simple-store';
import {authenticateUserAgainstFacebookToken} from '../aws/cognito';

class Init extends Component {

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.login = this.login.bind(this);
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 2222,
      easing: Easing.linear
    }).start(() => this.login());
  }

  login() {
    const {navigate} = this.props.navigation;
    store.get('user').then(user => {
      return authenticateUserAgainstFacebookToken(user.fb.token).then(credentials => {
        const config = {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken
        }
        const region = 'us-west-2:';
        store.update('user', {
          fb: user.fb,
          identidy: config,
          uid: credentials.data.IdentityId.slice(region.length)
        })
        return credentials.data.IdentityId.slice(region.length);
      }).then(user => fetch('https://8t9gh6uqi8.execute-api.us-east-1.amazonaws.com/dev/images/' + user, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })).then(data => data.json()).then(data => navigate('Main', {
        images: data,
        refreshing: false,
        path: 'https://s3.amazonaws.com/marcussmithtestbucket/image-not-found.jpg'
      }))
    }).catch(err => navigate('Login'));
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [
        0, 1
      ],
      outputRange: ['0deg', '1080deg']
    })
    this.spin();
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD'
      }}>
        <Animated.Image style={{
          transform: [
            {
              rotate: spin
            }
          ]
        }} source={require('../assets/bluespurs.png')}/>
      </View>
    );
  }
}

export default Init;
