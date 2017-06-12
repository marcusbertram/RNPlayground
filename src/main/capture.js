import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

class Capture extends Component {

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    const {navigate} = this.props.navigation;
    this.camera.capture().then((data) => {
      navigate('Photo', {
        path: data.path
      });
    }).catch(err => Alert.alert('Unable to capture picture, check permissions'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.temp}
        captureQuality={Camera.constants.CaptureQuality["480p"]}
        onFocusChanged={() => {}}>
        <Icon.Button style={styles.capture} size={60} backgroundColor='transparent' name="camera" onPress={this.takePicture.bind(this)}/>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    margin: 10
  }
});
export default Capture;
