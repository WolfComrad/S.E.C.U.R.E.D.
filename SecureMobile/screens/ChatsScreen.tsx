import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from './ScreenRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/styles';
import {chatScreenStyles} from '../styles/chatScreenStyles';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';

const ChatsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chats',
      headerRight: () => (
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: 8}}></View>
      ),
    });
  }, []);

  const messages = [
    {
      _id: 1,
      isRecieved: true,
      text: 'one',
      recieverId: 1,
    },
    {
      _id: 2,
      isRecieved: false,
      text: 'two',
      recieverId: 1,
    },
    {
      _id: 3,
      isRecieved: true,
      text: 'three',
      recieverId: 1,
    },
    {
      _id: 4,
      isRecieved: true,
      text: 'four',
      recieverId: 1,
    },
    {
      _id: 5,
      isRecieved: true,
      text: 'five',
      recieverId: 2,
    },
  ];

  const ID = 2;
  const messagesRoute = apiRoutes.chats + `/${ID}`;
  axios.get(messagesRoute).then(res => {
    console.log(res.data);
  });

  return (
    <View style={chatScreenStyles.screenContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>ChatsScreen</Text>
      </Pressable>
      <Pressable style={chatScreenStyles.button}>
        <Text>Retrieve</Text>
      </Pressable>
      {messages.map(x => (
        <Text>{x.text}</Text>
      ))}
    </View>
  );
};
export default ChatsScreen;
