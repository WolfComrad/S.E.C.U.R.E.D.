import React, {useState} from 'react';
import {useLayoutEffect} from 'react';
import {Modal, Pressable, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens} from '../screens/ScreenRoutes';
export default function LogoutButton() {
  const [modalVisible, setModalVisible] = useState(false);

  

  const handleLogout = () => {
    setModalVisible(!modalVisible);
    console.log('logged out');
  };
  return (
    <View style={styles.centeredView}>
      <Text>Home Screen</Text>
    </View>
  );
}
