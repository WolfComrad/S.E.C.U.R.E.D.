import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import {styles} from '../styles/styles';
const LogoutScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();

  const handleLogout = async () => {
    setLoading(true);
    const response = await axios.post(apiRoutes.logout);
    if (response.status !== 200) {
      Alert.alert('error logging out', response.status.toString());
      return;
    }
    console.log(response.status);
    await AsyncStorage.removeItem('authToken');
    setLoading(false);
    navigation.replace(screens.login);
  };
  return (
    <View style={styles.screenContainer}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <Pressable onPress={handleLogout}>
          <Text>logout</Text>
        </Pressable>
      )}
    </View>
  );
};

export default LogoutScreen;
