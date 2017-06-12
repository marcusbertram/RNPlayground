import React from 'react';
import {
  TabNavigator
} from 'react-navigation';

import {FeedStack} from './feed-stack';
import {PhotoStack} from './photo-stack';
import Icon from 'react-native-vector-icons/Foundation';

export const MainTabs = TabNavigator({
  Photo: {
    screen: PhotoStack,
    navigationOptions: {
      tabBarIcon: () => <Icon name="camera" size={35} color="#0088cc" />,
    },
  },
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarIcon: () => <Icon name="photo" size={35} color="#0088cc" />,
    },
  },
}, {
  tabBarOptions: {
    tabStyle: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: '#777777'
    },
    showLabel: false,
    showIcon: true
  }
});
