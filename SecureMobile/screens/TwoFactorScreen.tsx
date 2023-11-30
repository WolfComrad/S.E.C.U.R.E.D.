import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import {styles} from '../styles/styles';
import {useUser} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TwoFactorScreen = () => {
  const [twoFactor, setTwoFactor] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  const {login, userId} = useUser();
  const TwoFactorModel = {
    code: twoFactor,
  };

  useEffect(() => {
    const whoIs = async () => {
      const response = await axios.get(apiRoutes.whoami);
      if (response.status === 200) {
        login(response.data.id);
      } else {
        return;
      }
      whoIs();
    };
  });

  const handleSubmit = async () => {
    console.log(twoFactor);
    const response = await axios.post(
      apiRoutes.twoFactorEnable,
      TwoFactorModel,
    );
    if (response.status !== 200) {
      console.log(twoFactor);
      console.log(userId);

      return;
    }

    console.log(response.data);
    //await AsyncStorage.setItem('authToken', userId);
    setTwoFactor('');
    navigation.push(screens.home);
  };
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleText}>Check your email for code.</Text>
      <View style={styles.twoFactorContainer}>
        <Text style={styles.titleText}>Enter 2FA code:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setTwoFactor(text);
          }}
          placeholder="2FA code...."
          placeholderTextColor={'gray'}></TextInput>
        <Pressable style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.text}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TwoFactorScreen;
