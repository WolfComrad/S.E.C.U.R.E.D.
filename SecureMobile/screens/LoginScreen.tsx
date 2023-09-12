import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import axios from 'axios';
//Base url for everyone's IP
import {JACOBS_IP, MARCOS_IP} from '../urls/url';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      userName: username,
      password: password,
    };
    //Login endpoint call
    axios
      .post(JACOBS_IP + '/api/Authorization/login', user)
      .then(res => {
        console.log(`Username: ${user.userName}`);
        console.log(`Password: ${user.password}`);
        console.log('Logged In');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(`Username: ${user.userName}`);
        console.log(`Password: ${user.password}`);
        console.log(error);
        console.log('Not logged in :(');
      });
  };
  return (
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView>
        {/*Upper Login Text View*/}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        {/*Username and password prompts views*/}
        <View style={{marginTop: 70}}>
          <View>
            <Text style={styles.prompts.title}>Username</Text>
            <TextInput
              style={styles.prompts.input}
              placeholderTextColor={'black'}
              placeholder="Enter your username"
              value={username}
              onChangeText={text => {
                setUsername(text);
              }}
            />
          </View>
          <View style={{marginTop: 50}}>
            <Text style={styles.prompts.title}>Password</Text>
            <TextInput
              style={styles.prompts.input}
              placeholderTextColor={'black'}
              placeholder="Your password goes here"
              value={password}
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
          onPress={() => navigation.navigate('Register')}
          style={{
            marginTop: 15,
          }}>
          <Text style={styles.signupText}>
            Don't have an account? Register!
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'purple',
    fontSize: 21,
    fontWeight: '600',
  },
  prompts: {
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: 'gray',
    },
    input: {
      fontSize: 17,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginVertical: 1,
      width: 300,
    },
  },
  loginButton: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    width: 200,
    backgroundColor: 'purple',
    borderRadius: 6,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});
