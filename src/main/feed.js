import React, {Component} from 'react';
import {
  ScrollView,
  TouchableHighlight,
  Image,
  Text,
  RefreshControl,
  View
} from 'react-native';
import store from 'react-native-simple-store';

class Feed extends Component {

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    const {state, setParams} = this.props.navigation;
    store.get('user').then(user => {
      setParams({refreshing: true})
      fetch('https://8t9gh6uqi8.execute-api.us-east-1.amazonaws.com/dev/images/' + user.uid, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((data) => data.json()).then(data => {
        setParams({images: data, refreshing: false})
      })
    })
  }

  handlePress(image) {
    const {navigate} = this.props.navigation;
    navigate('Details', {
      ...image
    });
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <ScrollView style={{
        backgroundColor: '#FFFFFF'
      }} refreshControl={<RefreshControl refreshing = {
        state.params.refreshing
      }
      onRefresh = {
        this.refresh
      }/>}>
        {state.params.images.map((image) => {
          return (
            <TouchableHighlight key={image.id} onPress={() => this.handlePress(image)} style={{
              height: 200,
              flex: 1,
              margin: 10,
              padding: 2,
              backgroundColor: '#0088cc',
              elevation: 5
            }}>
              <View style={{
                flex: 1
              }}>
                <Image style={{
                  flex: 1,
                  height: '100%',
                  width: '100%'
                }} source={{
                  uri: 'https://s3.amazonaws.com/marcussmithtestbucket/' + image.uid + '/' + image.id
                }}/>
              </View>
            </TouchableHighlight>
          )
        })}
      </ScrollView>
    );
  }
}

export default Feed;
