import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {UserDto} from '../types';
import {styles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../screens/ScreenRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const Friend = (item: UserDto) => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const StartChatting = () => {
    navigation.push('ChattingWith');
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
        <Text>{item.email}</Text>
      </View>
      <View>
        <Pressable style={styles.FriendButtonStyle} onPress={StartChatting}>
          <Text style={styles.SimpleTextStyle}>Chat</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Friend;
