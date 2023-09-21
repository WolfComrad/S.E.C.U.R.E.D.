import {View, Text, Pressable, Alert} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from './ScreenRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';
import {UserDto} from '../types';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {useUser} from '../UserContext';

const ChatsScreen = () => {
  return (
    <View style={styles.RegisterScreenStyle}>
      <Pressable>
        <Text>Chats</Text>
      </Pressable>
    </View>
  );
};
export default ChatsScreen;
