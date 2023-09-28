import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FriendRequestDto, UserDto} from '../types';
import {styles} from '../styles/styles';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {useUser} from '../UserContext';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

const User = (item: UserDto) => {
  const {userId} = useUser();
  const friendRequest = {
    senderId: userId,
    receiverId: item.id,
    userName: item.userName,
  };
  const handleFriendRequest = async () => {
    const response = await axios.post<FriendRequestDto>(
      apiRoutes.friendRequest,
      friendRequest,
    );
    if (response.status !== 200) {
      return;
    }
  };

  return (
    <Pressable style={styles.UserCardStyle}>
      <View>
        <Image
          style={{width: 50, height: 50, borderRadius: 25, margin: 10}}
          source={require('../assets/tux.jpg')}
        />
      </View>
      <View style={styles.SimpleFlexStyle}>
        <Text style={styles.FriendNameStyle}>{item.userName}</Text>
        <Text>{item.email}</Text>
      </View>
      <View>
        <Pressable
          style={styles.FriendButtonStyle}
          onPress={handleFriendRequest}>
          <Text style={styles.SimpleTextStyle}>Add Friend</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default User;
