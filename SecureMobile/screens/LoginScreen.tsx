import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {apiRoutes} from '../urls/routes/routes';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//Base url for everyone's IP
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {screens} from './ScreenRoutes';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

type UserDto = {
  id: Int32;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
};

const LoginScreen = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          console.log(`Auth token: ${token}`);
          navigation.replace(screens.home);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const user = {
    userName: username,
    password: password,
  };

  const handleLogin = async () => {
    setLoading(true);

    //Login endpoint call
    const loginResponse = await axios.post<UserDto>(apiRoutes.login, user);
    if (loginResponse.status === 200) {
      console.log(loginResponse.data);
      const token = loginResponse.data.id;
      console.log(token);
      AsyncStorage.setItem('authToken', token.toString());
      setUsername('');
      setPassword('');
      setLoading(false);
      navigation.navigate(screens.home);
    } else {
      setLoading(false);
      Alert.alert('Login Error', 'An Error occurred while Loggin In');
    }
  };
  return (
    <View style={styles.screenContainer}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          {/*Upper Login Text View*/}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          {/*Username and password prompts views*/}
          <View style={{marginTop: 70}}>
            <View>
              <Text style={styles.title}>Username</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={'black'}
                placeholder="Enter your username"
                value={username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />
            </View>
            <View style={{marginTop: 50}}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={'black'}
                placeholder="Your password goes here"
                value={password}
                secureTextEntry={true}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>
          </View>
          {/*Login Button*/}
          <Pressable
            onPress={() => {
              handleLogin();
            }}
            style={styles.loginButton}>
            <Text style={styles.text}>Log In</Text>
          </Pressable>
          {/*Signup Pressable Text*/}
          <Pressable
            onPress={() => navigation.navigate(screens.register)}
            style={{
              marginTop: 15,
            }}>
            <Text style={styles.signupText}>
              Don't have an account? Register!
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};
export default LoginScreen;
