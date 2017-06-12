import React, {Component} from 'react';
import {View, Text, Button, Alert, Linking} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authenticateUserAgainstFacebookToken} from '../aws/cognito'

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.login = this.login.bind(this);
  }

  handleLink() {
    Linking.openURL('https://bluespurs.com').catch(err => Alert.alert('We were unable to open this link'));
  }

  login() {
    const {navigate} = this.props.navigation;
    FBLoginManager.loginWithPermissions(["email"], (error, data) => {
      if (error) {
        Alert.alert("Unable to login against facebook")
        return;
      }
      authenticateUserAgainstFacebookToken(data.credentials.token).then((credentials) => {
        const config = {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken
        }
        const region = 'us-west-2:'
        store.update('user', {
          fb: data.credentials,
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
      })).catch(() => Alert.alert("Unable to log in and store data"));
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0088cc'
      }}>
        <View style={{
          margin: 25
        }}>
          <Text style={{
            color: "white",
            fontSize: 24,
            textAlign: 'center'
          }}>
            By login in with Facebook you agree to the
          </Text>
          <Text style={{
            color: "#DDDDDD",
            fontSize: 24,
            textDecorationLine: 'underline',
            textAlign: 'center'
          }} onPress={this.handleLink}>
            Terms and Conditions
          </Text>
        </View>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.login}>
          <Text style={{
            fontFamily: 'Arial',
            fontSize: 15,
            color: 'white'
          }}>
            Login with Facebook
          </Text>
        </Icon.Button>
      </View>
    );
  }
}

export default Login;
