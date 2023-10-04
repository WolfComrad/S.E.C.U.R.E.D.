import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {FriendRequestDto} from '../types';
import {styles} from '../styles/styles';
import {apiRoutes} from '../urls/routes/routes';
import axios from 'axios';

interface ChildComponentProps {
  handleRerender: (item: FriendRequestDto) => void;
  item: FriendRequestDto;
}

const FriendRequest = ({item,handleRerender} : ChildComponentProps) => {
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
          onPress={() => handleRerender(item)}>
          <Text style={styles.SimpleTextStyle}>Accept</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default FriendRequest;
