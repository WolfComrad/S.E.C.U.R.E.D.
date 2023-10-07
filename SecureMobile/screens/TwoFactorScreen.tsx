import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
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
  const {userId} = useUser();
  const TwoFactorModel = {
    code: twoFactor,
  };
  const handleSubmit = async () => {
    console.log(twoFactor);
    const response = await axios.post(
      apiRoutes.twoFactorEnable,
      TwoFactorModel,
    );
    if (response.status !== 200) {
      console.log(twoFactor);
      return;
    }
    console.log(userId);
    await AsyncStorage.setItem('authToken', userId.toString());
    console.log(response.data);
    navigation.navigate(screens.home);
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
