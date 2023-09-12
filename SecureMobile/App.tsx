/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  RegisterScreenStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  FieldStyle: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
});

export default App;
