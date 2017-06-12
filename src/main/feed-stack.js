import React from 'react';
import { StackNavigator } from 'react-navigation';
import Feed from './feed';
import Details from './details';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
  },
  Details: {
    screen: Details
  },
}, {
  mode: 'modal',
  headerMode: 'none'
});
