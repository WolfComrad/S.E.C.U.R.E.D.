import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
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
import {styles} from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {screens} from './ScreenRoutes';
import {UserDto} from '../types';
import {useUser} from '../UserContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkUserName, setCheckUserName] = useState(true);
  const [checkValidPassword, setCheckValidPassword] = useState(true);
  const [loginPressed, setLoginPressed] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {login} = useUser();
  const user = {
    userName: username,
    password: password,
  };
  const handleLogin = async () => {
    setLoading(true);
    axios
      .post<UserDto>(apiRoutes.login, user)
      .then(res => {
        
        console.log(res.data.id);
        let token = res.data.id;
        login(token.toString());
        console.log(token);
        AsyncStorage.setItem('authToken', token.toString());
        setUsername('');
        setPassword('');
        setLoading(false);
        setLoginError(false); 
        navigation.replace(screens.home);
      })
      .catch(error => {
        setLoginPressed(true);
        setLoginError(true);
        setLoading(false);
        Alert.alert('Login Error', 'An error occurred while logging In');
        console.log('Username: ', user.userName, '\nPassword: ', user.password);
        console.log(error);
      });

    // try {
    //   const loginResponse = await axios.post<UserDto>(apiRoutes.login, user);
    //   if (loginResponse.status === 200) {
    //     console.log(loginResponse.data);
    //     let token = loginResponse.data.id;
    //     login(token.toString());
    //     console.log(token);
    //     AsyncStorage.setItem('authToken', token.toString());
    //     setUsername('');
    //     setPassword('');
    //     navigation.replace(screens.home);
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     Alert.alert('Login Error', 'An Error occurred while Loggin In');
    //   }
    // } catch (error) {
    //   Alert.alert('Login Error', 'An Error occurred while Loggin In');
    //   console.log(error);
    // }
  };

  useEffect(() => {
    setLoading(true);
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        console.log(`Auth token: ${token}`);
        login(token.toString());
        setLoading(false);
        navigation.replace(screens.home);
      } else {
        setLoading(false);
        return;
      }
    };
    checkLoginStatus();
  }, []);

  //Constantly Rerendering Error Checking AFTER initial render
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current && loginPressed) {
      handleCheckUserName();
      handleCheckPassword();
      setLoginError(false);
    } else {
      firstRender.current = true;
    }
  }, [username, password]);
  const handleCheckUserName = () => {
    username ? setCheckUserName(true) : setCheckUserName(false);
    // console.log(`username? = ${checkUserName}`);
  };
  const handleCheckPassword = () => {
    password ? setCheckValidPassword(true) : setCheckValidPassword(false);
    // console.log(`password? = ${checkValidPassword}`);
  };

  //Component render
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
          {/*Username prompt view*/}
          <View style={{marginTop: 70}}>
            <View>
              <View style={styles.promptTitleContainer}>
                <Text style={styles.title}>Username</Text>
                {!checkUserName && (
                  <Text style={styles.promptErrorMessage}>
                    Username field is empty
                  </Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholderTextColor={'gray'}
                placeholder="ex: JohnPringle"
                value={username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />
            </View>
            {/*Password prompt view*/}
            <View style={{marginTop: 50}}>
              <View style={styles.promptTitleContainer}>
                <Text style={styles.title}>Password</Text>
                {!checkValidPassword && (
                  <Text style={styles.promptErrorMessage}>
                    Password field is empty
                  </Text>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholderTextColor={'gray'}
                placeholder="min 8. characters"
                value={password}
                secureTextEntry={true}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>
          </View>
          {/*Login Button and Error*/}
          <View style={{marginTop: 10}}>
            {loginError && (
              <Text style={styles.loginErrorMessage}>
                The username or password you entered is incorrect.
              </Text>
            )}
            <Pressable
              onPress={() => {
                handleLogin();
              }}
              disabled={!checkUserName || !checkValidPassword ? true : false}
              style={
                !checkUserName || !checkValidPassword || loginError
                  ? styles.disabledLoginButton
                  : styles.loginButton
              }>
              <Text style={styles.text}>Log In</Text>
            </Pressable>
          </View>

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
