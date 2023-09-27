import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Pressable, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/styles';
import DiffIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {UserDto} from '../types';
import {useUser} from '../UserContext';
import {ScrollView} from 'react-native';
import User from '../components/User';
const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const {userId, setUserId} = useUser();
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get<UserDto>(apiRoutes.whoami);
      console.log(response.data);
      setUserName(response.data.userName);
      console.log(userId);
    };
    const fetchUsers = async () => {
      const response = await axios.get<UserDto[]>(apiRoutes.fetchUsers);
      if (response.status === 200) {
        setUsers(response.data);
        console.log(response.data);
      } else {
        console.log('you suck at programming');
      }
    };
    fetchUsers();
    getUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate(screens.logout)}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
            source={require('../assets/defaultLogo.jpg')}
          />
        </Pressable>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Pressable onPress={() => navigation.navigate(screens.chats)}>
            <Icon name="chat-plus-outline" size={27} color={'#be89f0'} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(screens.friend)}>
            <Icon name="account-group" size={27} color={'#be89f0'} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(screens.friendRequest)}>
            <Icon name="account-details" size={27} color={'#be89f0'} />
          </Pressable>
        </View>
      ),
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {users.map((value, index) => (
          <View key={index}>
            <User
              userName={value.userName}
              id={value.id}
              firstName={value.firstName}
              lastName={value.lastName}
              phoneNumber={value.phoneNumber}
              email={value.email}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
