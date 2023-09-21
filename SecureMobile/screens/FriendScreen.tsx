import {View, Text, Alert, Pressable} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../UserContext';
import {UserDto} from '../types';
import {apiRoutes} from '../urls/routes/routes';
import {Screens} from './ScreenRoutes';
import {styles} from '../styles';

const FriendScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const [friends, setFriends] = useState<UserDto[]>([]);
  const {userId} = useUser();
  useEffect(() => {
    try {
    } catch (error) {}
    const fetchFriends = async () => {
      const response = await axios.get<UserDto[]>(
        apiRoutes.fetchFriends + `${userId} `,
      );
      if (response.status !== 200) {
        Alert.alert('Falied to get friends', response.status.toString());
        return;
      }

      setFriends(response.data);
      console.log(response.data);
    };
    fetchFriends();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Friends',
      headerRight: () => (
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: 8}}></View>
      ),
    });
  }, []);

  return (
    <View style={styles.RegisterScreenStyle}>
      <Pressable>
        <Text>
          {friends.map((value, index) => (
            <Text key={index}>{value.userName}</Text>
          ))}
        </Text>
      </Pressable>
    </View>
  );
};

export default FriendScreen;
