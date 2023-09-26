import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {UserDto} from '../types';
import {styles} from '../styles';

const Friend = (item: UserDto) => {
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
        <Text>{item.email}</Text>
      </View>
      <View>
        <Pressable
          style={styles.FriendButtonStyle}
          onPress={() => console.log(`Chatted with ${item.userName}`)}>
          <Text style={styles.SimpleTextStyle}>Chat</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Friend;
