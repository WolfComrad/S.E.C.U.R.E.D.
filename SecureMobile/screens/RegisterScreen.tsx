import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../App';
import axios from 'axios';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';
const baseUrl = 'https://localhost:8080';

function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const handleRegister = async () => {
    const userDto = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    };
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDto),
    };

    //Send a post to API
     console.log('made it here');
    await fetch(
      `http://192.168.56.1:5001/api/authorization/register`,
      requestOptions,
    )
      .then(response => {
        console.log('something happened');
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // axios
  //   .post(`${baseUrl}/api/authorization/register`, userDto)
  //   .then(response => {
  //     console.log(response.status);
  //     Alert.alert(
  //       ' Registration successful',
  //       'You have been registered Successfully!',
  //     );
  //     setFirstName('');
  //     setLastName('');
  //     setUserName('');
  //     setEmail('');
  //     setPassword('');
  //     setPhoneNumber('');
  //   })
  //   .catch(error => {
  //     Alert.alert(
  //       'Registration Error',
  //       'An Error occurred while registering',
  //     );
  //     console.log('registration failed', error);
  //     console.log();
  //   });

  return (
    <>
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
          Register To your Account
        </Text>
        <View style={{marginTop: 50}}>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.FieldStyle}
              placeholder="Enter Email"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              First Name
            </Text>
            <TextInput
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.FieldStyle}
              placeholder="Enter First Name"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              Last Name
            </Text>
            <TextInput
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.FieldStyle}
              placeholder="Enter Last Name"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              User Name
            </Text>
            <TextInput
              value={userName}
              onChangeText={text => setUserName(text)}
              style={styles.FieldStyle}
              placeholder="Enter User Name"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              Phone Number
            </Text>
            <TextInput
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              style={styles.FieldStyle}
              placeholder="Enter Phone Number"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.FieldStyle}
              placeholder="Enter Password"
              placeholderTextColor={'black'}
            />
          </View>
        </View>
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
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
            Register
          </Text>
        </Pressable>
        <Pressable style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            {' '}
            Already Have an Account? Sign in
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default RegisterScreen;
