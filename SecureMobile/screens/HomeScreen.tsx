import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Pressable, Image, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {FriendRequestDto, UserDto} from '../types';
import {useUser} from '../UserContext';
import {ScrollView} from 'react-native';
import User from '../components/User';
const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const {userId,login} = useUser();
  const [friendRequest, setFriendRequest] = useState<FriendRequestDto[]>([]);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<UserDto[]>([]);
  const [count, setCount] = useState(0);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get<UserDto>(apiRoutes.whoami);
      if (response.status === 200) {
        setUserName(response.data.userName);
        console.log(userName, 'dkdkdkdkdk');
        login(response.data.id.toString())
      }

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
    const fetchFriendRequest = async () => {
      const response = await axios.get<FriendRequestDto[]>(
        apiRoutes.fetchFriendRequest + userId,
      );
      if (response.status !== 200) {
        return;
      } else {
        console.log(response.data);
        setFriendRequest(response.data);
        setCount(count);
      }
    };
    fetchFriendRequest();
    fetchUsers();
    getUser();
  }, []);

  const handleFriendRequestNavigation = () => {
    setViewed(true);
    navigation.navigate(screens.friendRequest);
  };

  useEffect(() => {
    // Update the count based on the friend requests received

    setCount(friendRequest.length);
  }, [friendRequest]);

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
          <View style={{right: -5}}>
            <Pressable
              style={{flex: 1, flexDirection: 'row'}}
              onPress={handleFriendRequestNavigation}>
              <Icon name="account-details" size={27} color={'#be89f0'} />
              {count > 0 && !viewed ? (
                <Text style={{fontSize: 12, color: 'green'}}>{count}</Text>
              ) : (
                <View></View>
              )}
            </Pressable>
          </View>
        </View>
      ),
    });
  }, [count, viewed]);
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
              twoFactorEnabled={value.twoFactorEnabled}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
