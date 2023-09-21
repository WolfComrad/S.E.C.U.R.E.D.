import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from './ScreenRoutes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';

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

  return (
    <View style={styles.RegisterScreenStyle}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>ChatsScreen</Text>
      </Pressable>
    </View>
  );
};
export default ChatsScreen;
