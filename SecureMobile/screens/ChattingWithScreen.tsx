import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Avatar, GiftedChat, IMessage} from 'react-native-gifted-chat';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import {Icon} from 'react-native-vector-icons/Icon';
import {UserDto} from '../types';

type ChattingWithScreenParams = {
  item: UserDto;
};

const userguy = {
  _id: '1',
  name: 'john',
  avatar:
    'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
};

const ChattingWithScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const route =
    useRoute<RouteProp<Record<string, ChattingWithScreenParams>, string>>();
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();

  let item: UserDto = route.params?.item;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            <Text>{item.userName}</Text>
          </Pressable>
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    setMessages([
      {
        _id: '1',
        text: 'Hello developer',
        createdAt: new Date(),

        user: {
          _id: '2',
          name: item.userName,
          avatar:
            'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return <GiftedChat messages={messages} onSend={onSend} user={userguy} />;
};
export default ChattingWithScreen;
