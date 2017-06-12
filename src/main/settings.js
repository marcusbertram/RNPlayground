import React, {Component} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {navigate, state} = this.props.navigation;
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <Text style={{
          color: "#0088cc",
          fontSize: 32,
          textAlign: 'center'
        }}>
          {state.params.name}
        </Text>
        <View style={{
          margin: 25
        }}>
          <Image style={{
            width: 250,
            height: 250
          }} source={{
            uri: state.params.picture
          }}/>
        </View>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => FBLoginManager.logout((error, data) => {
          error
            ? Alert.alert("Unable to logout")
            : store.delete('user').then(() => navigate('Init'));
        })}>
          <Text style={{
            fontFamily: 'Arial',
            fontSize: 15,
            color: 'white'
          }}>
            LOGOUT
          </Text>
        </Icon.Button>
      </View>
    );
  }
}

export default Settings;
