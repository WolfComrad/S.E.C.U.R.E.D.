import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {UserDto} from '../types';
import {useUser} from '../UserContext';
const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const {userId, setUserId} = useUser();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get<UserDto>(apiRoutes.whoami);
      console.log(response.data);
      setUserName(response.data.userName);
      console.log(userId);
    };

    getUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Text style={styles.titleText}>BulletChat</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Pressable onPress={() => console.log('chatscreen')}>
            <Icon name="chat-outline" size={27} />
          </Pressable>
          <Pressable onPress={() => console.log('add Friends')}>
            <Icon name="account-multiple-plus-outline" size={27} />
          </Pressable>
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <Text style={styles.title}>Welcome {userName}</Text>
    </View>
  );
};

export default HomeScreen;
