import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GiftedChat, IMessage, User} from 'react-native-gifted-chat';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import {UserDto, newUserDto} from '../types';
import {Message, NewUserDto} from '../interfaces';
import {useUser} from '../UserContext';
import {apiRoutes} from '../urls/routes/routes';
import axios from 'axios';
// Use the desired ECC curve

type ChattingWithScreenParams = {
  item: UserDto;
};

const ChattingWithScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [typing, isTyping] = useState<boolean>(false);
  const route =
    useRoute<RouteProp<Record<string, ChattingWithScreenParams>, string>>();
  let item: UserDto = route.params?.item;
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();

  const {userId} = useUser();

  const userguy: NewUserDto = {
    _id: parseInt(userId), // Use the actual user's ID
    name: item.userName,
    email: item.email,
    avatar: '',
  };

  const personImChattingWith: NewUserDto = {
    _id: item.id, // Use the actual user's ID
    name: item.userName,
    email: item.email,
    avatar:
      'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
  };

  let Id = item.id.toString();
  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get<Message[]>(apiRoutes.getMessages + Id);

      let messages = response.data;
      let count = 0;
      messages.forEach(element => {
        element._id = element.id;
        if (element.receiverId == parseInt(userId)) {
          console.log(element.receiverId);
          element.dateCreated = new Date();
          element.user = personImChattingWith;
        } else {
          console.log(element.senderId);
          console.log('butt');
          element.user = userguy;
          element.dateCreated = new Date();
        }
      });
      setMessages(messages);
    };
    try {
      getMessages();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            left: -50,
          }}>
          <Pressable onPress={() => navigation.navigate(screens.logout)}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
              source={{
                uri: 'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
              }}
            />
            <Text
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                left: -10,
              }}>
              {item.userName}
            </Text>
          </Pressable>
        </View>
      ),
    });
  }, []);

  const onSend = useCallback(
    (messages: Message[]) => {
      const model = {
        message: messages[0].text,
        userId: item.id,
      };
      const sendMessage = async () => {
        const response = await axios.post<Message>(
          apiRoutes.sendMessage,
          model,
        );
        console.log(response.data);
      };
      try {
        sendMessage();
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
      } catch (error) {
        console.log(error);
      }
    },
    [messages],
  );
  return (
    <GiftedChat
      isTyping={typing}
      alwaysShowSend
      user={userguy}
      messages={messages}
      onSend={onSend}
    />
  );
};
export default ChattingWithScreen;
