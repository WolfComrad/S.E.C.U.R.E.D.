import React, {useLayoutEffect, useState} from 'react';
import {View, Text, Pressable, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ChattingWithScreen = () => {
  const navigation = useNavigation<any>();
  const [sendButton, setSendButton] = useState(false);

  const checkInput = (input: string) => {
    if (input.length == 0) {
      setSendButton(false);
    } else {
      setSendButton(true);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            right: 60,
          }}>
          <Pressable onPress={() => console.log('My Friends Profile Dude')}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
              }}
              source={require('../assets/defaultLogo.jpg')}
            />
          </Pressable>
        </View>
      ),
    });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: '#cbaed6',
      }}>
      <View
        style={{
          justifyContent: 'flex-start',
          borderRadius: 29,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'lightgrey',
        }}>
        <TextInput
          onChangeText={input => checkInput(input)}
          style={{
            marginLeft: 10,
            width: '85%',
          }}
          placeholder="Message"></TextInput>
        {!sendButton ? (
          <Pressable disabled={true}>
            <Icon name="arrow-up-bold-circle" size={27} color={'grey'} />
          </Pressable>
        ) : (
          <Pressable>
            <Icon name="arrow-up-bold-circle" size={27} color={'blue'} />
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default ChattingWithScreen;
