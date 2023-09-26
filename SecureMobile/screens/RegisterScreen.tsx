import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../styles';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {apiRoutes} from '../urls/routes/routes';
import {Screens, screens} from './ScreenRoutes';
import {useUser} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDto} from '../types';

function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [checkLastName, setCheckLastName] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(true);
  const [checkValidPassword, setCheckValidPassword] = useState(true);
  const [checkValidPhoneNumber, setCheckValidPhoneNumber] = useState(true);
  const [loading, setLoading] = useState(false);
  const {login} = useUser();
  const navigate = useNavigation<NativeStackNavigationProp<any, Screens>>();

  const userDto = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    phoneNumber: phoneNumber,
  };

  const handleCheckPassword = (password: string) => {
    let re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(password);
    if (re.test(password)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
    }
  };
  const handleCheckPhoneNumber = (phoneNumber: string) => {
    let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    setPhoneNumber(phoneNumber);

    if (regex.test(phoneNumber)) {
      setCheckValidPhoneNumber(false);
    } else {
      setCheckValidPhoneNumber(true);
    }
  };

  const handleCheckFirstName = (name: string) => {
    setFirstName(name);
    if (name.length > 0 && !/\s/.test(name)) {
      setCheckFirstName(false);
    } else {
      setCheckFirstName(true);
    }
  };
  const handleCheckLastName = (name: string) => {
    setLastName(name);
    if (name.length > 0 && !/\s/.test(name)) {
      setCheckLastName(false);
    } else {
      setCheckLastName(true);
    }
  };

  const handleCheckEmail = (email: string) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    setEmail(email);

    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const registerResponse = await axios.post<UserDto>(
        apiRoutes.register,
        userDto,
      );

      if (registerResponse.status === 200) {
        console.log('registered');
        console.log('logging in');

        let username = userDto.userName;
        let password = userDto.password;
        const loginResponse = await axios.post(apiRoutes.login, {
          username,
          password,
        });
        AsyncStorage.setItem('authToken', loginResponse.data.id);
        if (loginResponse.status === 200) {
          console.log('Login successful');
          console.log(loginResponse.data);
          login(loginResponse.data.id);

          setFirstName('');
          setLastName('');
          setUserName('');
          setEmail('');
          setPassword('');
          setPhoneNumber('');
          setLoading(false);
          navigate.navigate(screens.home);
        }
      } else {
        Alert.alert('error registering');
        console.log(registerResponse.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.RegisterScreenStyle}>
        {loading ? (
          <View>
            <ActivityIndicator style={{height: 800}} size={'large'} />
          </View>
        ) : (
          <View style={styles.RegisterScreenStyle}>
            <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
              Register
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 17,
                marginTop: 15,
              }}>
              Register An Account
            </Text>
            <View style={{marginTop: 50}}>
              <View>
                <TextInput
                  value={email}
                  onChangeText={text => handleCheckEmail(text)}
                  style={styles.FieldStyle}
                  placeholder="Enter Email"
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  Email
                  {!checkValidEmail ? (
                    <Text style={{color: 'green'}}>* Accepted</Text>
                  ) : (
                    <Text style={{color: 'red'}}>* Incorrect Format</Text>
                  )}
                </Text>
              </View>

              <View>
                <TextInput
                  value={firstName}
                  onChangeText={text => handleCheckFirstName(text)}
                  style={styles.FieldStyle}
                  placeholder="Enter First Name"
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  First Name
                  {!checkFirstName ? (
                    <Text style={{color: 'green'}}>* Accepted</Text>
                  ) : (
                    <Text style={{color: 'red'}}>* Incorrect Format</Text>
                  )}
                </Text>
              </View>
              <View>
                <TextInput
                  value={lastName}
                  onChangeText={text => handleCheckLastName(text)}
                  style={styles.FieldStyle}
                  placeholder="Enter Last Name"
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  Last Name
                  {!checkLastName ? (
                    <Text style={{color: 'green'}}>* Accepted</Text>
                  ) : (
                    <Text style={{color: 'red'}}>* Incorrect Format</Text>
                  )}
                </Text>
              </View>
              <View>
                <TextInput
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  style={styles.FieldStyle}
                  placeholder="Enter User Name"
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  User Name
                </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={text => handleCheckPhoneNumber(text)}
                  value={phoneNumber}
                  style={styles.FieldStyle}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  Phone Number
                  {!checkValidPhoneNumber ? (
                    <Text style={{color: 'green'}}>* Accepted</Text>
                  ) : (
                    <Text style={{color: 'red'}}>* Incorrect Format</Text>
                  )}
                </Text>
              </View>
              <View>
                <TextInput
                  value={password}
                  onChangeText={text => handleCheckPassword(text)}
                  style={styles.FieldStyle}
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  placeholderTextColor={'black'}
                />
                <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
                  Password
                  {!checkValidPassword ? (
                    <Text style={{color: 'green'}}>* Accepted</Text>
                  ) : (
                    <Text style={{color: 'red'}}>* Incorrect Format</Text>
                  )}
                </Text>
              </View>
            </View>
            {!checkValidEmail &&
            !checkValidPassword &&
            !checkValidPhoneNumber &&
            !checkFirstName &&
            !checkLastName ? (
              <Pressable
                onPress={handleRegister}
                style={{
                  backgroundColor: 'purple',
                  marginTop: 50,
                  width: 200,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                  Register
                </Text>
              </Pressable>
            ) : (
              <Pressable
                disabled={true}
                style={{
                  backgroundColor: 'gray',
                  marginTop: 50,
                  width: 200,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                  Register
                </Text>
              </Pressable>
            )}
            <Pressable
              style={{marginTop: 15}}
              onPress={() => navigate.navigate('Login')}>
              <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
                {' '}
                Already Have an Account? Sign in
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
