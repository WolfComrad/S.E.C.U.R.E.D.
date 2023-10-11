import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from './ScreenRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {chatScreenStyles} from '../styles/chatScreenStyles';

const ShowChatsScreen = () => {
  return (
    <View style={chatScreenStyles.screenContainer}>
      <Text>ChatsScreen</Text>
    </View>
  );
};
export default ShowChatsScreen;
