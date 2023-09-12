import React, {useState} from 'react';
import {baseUrl} from './testingUrls/URLS';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../App';
import axios from 'axios';

function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [checkValidPhoneNumber, setCheckValidPhoneNumber] = useState(false);

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
      setCheckFirstName(true);
    } else {
      setCheckFirstName(false);
      console.log(name);
    }
  };
  const handleCheckLastName = (name: string) => {
    setLastName(name);
    if (name.length > 0 && !/\s/.test(name)) {
      setCheckLastName(true);
    } else {
      setCheckLastName(false);
      console.log(name);
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
    const userDto = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    };

    axios
      .post(`${baseUrl}/api/authorization/register`, userDto)
      .then(response => {
        console.log(response.status);
        Alert.alert(
          ' Registration successful',
          'You have been registered Successfully!',
        );
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'An Error occurred while registering',
        );
        console.log('registration failed', error);
      });
  };

  return (
    <ScrollView>
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
            {!checkValidEmail ? (
              <Text style={{color: 'green'}}>* Accepted</Text>
            ) : (
              <Text style={{color: 'red'}}>* Incorrect Format</Text>
            )}
            <TextInput
              value={email}
              onChangeText={text => handleCheckEmail(text)}
              style={styles.FieldStyle}
              placeholder="Enter Email"
              placeholderTextColor={'black'}
            />
          </View>

          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              First Name
            </Text>
            {checkFirstName ? (
              <Text style={{color: 'green'}}>* Accepted</Text>
            ) : (
              <Text style={{color: 'red'}}>* Incorrect Format</Text>
            )}
            <TextInput
              value={firstName}
              onChangeText={text => handleCheckFirstName(text)}
              style={styles.FieldStyle}
              placeholder="Enter First Name"
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
              Last Name
            </Text>
            {checkLastName ? (
              <Text style={{color: 'green'}}>* Accepted</Text>
            ) : (
              <Text style={{color: 'red'}}>* Incorrect Format</Text>
            )}
            <TextInput
              value={lastName}
              onChangeText={text => handleCheckLastName(text)}
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
            {!checkValidPhoneNumber ? (
              <Text style={{color: 'green'}}>* Accepted</Text>
            ) : (
              <Text style={{color: 'red'}}>* Incorrect Format</Text>
            )}
            <TextInput
              onChangeText={text => handleCheckPhoneNumber(text)}
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
            {!checkValidPassword ? (
              <Text style={{color: 'green'}}>* Accepted</Text>
            ) : (
              <Text style={{color: 'red'}}>* Incorrect Format</Text>
            )}
            <TextInput
              value={password}
              onChangeText={text => handleCheckPassword(text)}
              style={styles.FieldStyle}
              placeholder="Enter Password"
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        {!checkValidEmail &&
        !checkValidPassword &&
        !checkValidPhoneNumber &&
        !checkFirstName ? (
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
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
              Register
            </Text>
          </Pressable>
        )}
        <Pressable style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            {' '}
            Already Have an Account? Sign in
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
