import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Screens, screens} from './ScreenRoutes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserType} from '../UserContext';
import {styles} from '../styles';
import axios from 'axios';
import { apiRoutes } from '../urls/routes/routes';
const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(apiRoutes.whoami);
      console.log(response.data);
    } 
   
  getUser();
    return () => {
      
    }
  }, [])
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Text style={styles.titleText}>Bullet Chat</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Icon name="chat-outline" size={27} />
          <Icon name="account-multiple-plus-outline" size={27} />
        </View>
      ),
    });
  }, []);
  return <View></View>;
};

export default HomeScreen;
