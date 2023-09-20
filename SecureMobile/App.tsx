/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from './UserContext';

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
