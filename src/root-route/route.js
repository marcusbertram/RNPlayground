import React from 'react';
import { StackNavigator } from 'react-navigation';

import Init from '../init/init';
import Login from '../login/login';
import { MainTabs } from '../main/main';


export const Root = StackNavigator({
  Init: {
    screen: Init
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    }
  },
  Main: {
    screen: MainTabs
  }
}, {
  mode: 'modal',
  headerMode: 'none'
});
