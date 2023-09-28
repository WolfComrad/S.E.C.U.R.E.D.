import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {FriendRequestDto} from '../types';
import {styles} from '../styles/styles';
import {apiRoutes} from '../urls/routes/routes';
import axios from 'axios';

const FriendRequest = (item: FriendRequestDto) => {
  const acceptFriendRequest = async () => {
    const response = await axios.post(apiRoutes.acceptFriendRequest + item.id);
    if (response.status !== 200) {
      return;
    }
    console.log(response.data);
  };
  return (
    <Pressable style={styles.UserCardStyle}>
      <View>
        <Image
          style={styles.ImageStyle}
          source={require('../assets/tux.jpg')}
        />
      </View>
      <View style={styles.SimpleFlexStyle}>
        <Text style={styles.FriendNameStyle}>{item.userName}</Text>
      </View>
      <View>
        <Pressable
          style={styles.FriendButtonStyle}
          onPress={acceptFriendRequest}>
          <Text style={styles.SimpleTextStyle}>Accept</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default FriendRequest;
