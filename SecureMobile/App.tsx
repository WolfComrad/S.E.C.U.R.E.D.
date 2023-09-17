/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from './UserContext';

import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </NavigationContainer>
  );
};

export default App;
