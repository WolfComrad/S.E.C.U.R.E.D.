import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserDto} from '../types';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {styles} from '../styles/styles';

const User = (item: UserDto) => {
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
          onPress={() => console.log(`Added ${item.userName}`)}>
          <Text style={styles.SimpleTextStyle}>Add Friend</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default User;
