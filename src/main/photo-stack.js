import React from 'react';
import { StackNavigator } from 'react-navigation';
import Photo from './photo';
import Settings from './settings';
import Capture from './capture';

export const PhotoStack = StackNavigator({
  Photo: {
    screen: Photo,
  },
  Settings: {
    screen: Settings
  },
  Capture: {
    screen: Capture
  }
}, {
  mode: 'modal',
  headerMode: 'none'
});
