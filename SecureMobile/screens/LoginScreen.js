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

//External Screens
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView>
        {/*Upper Login Text View*/}
        <View
          style={{
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#4A55A2', fontSize: 17, fontWeight: '600'}}>
            Log In
          </Text>
          <Text style={{fontSize: 17, fontWeight: '600', marginTop: 15}}>
            Log in to Your Account
          </Text>
        </View>
        {/*Username and password prompts views*/}
        <View style={{marginTop: 50}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Username
            </Text>
            <TextInput
              style={{
                fontSize: username ? 17 : 17,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 1,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter your username"
              value={username}
              onChangeText={text => {
                setUsername(text);
              }}
            />
          </View>
          <View style={{marginTop: 50}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Password
            </Text>
            <TextInput
              style={{
                fontSize: username ? 17 : 17,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 1,
                width: 300,
              }}
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
            navigation.navigate('Home');
          }}
          style={{
            marginTop: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
            width: 200,
            backgroundColor: '#4A55A2',
            borderRadius: 6,
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
            Login
          </Text>
        </Pressable>
        {/*Signup Pressable Text*/}
        <Pressable
          style={{
            marginTop: 15,
          }}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({});
