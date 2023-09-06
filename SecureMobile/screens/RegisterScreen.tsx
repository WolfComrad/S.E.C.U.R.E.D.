import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../App';

function RegisterScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <View style={styles.RegisterScreenStyle}>
        <KeyboardAvoidingView />
        <Text style={{color: 'purple', fontWeight: '600', fontSize: 18}}>
          Register An Account
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
              User Name
            </Text>
            <TextInput
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
              onChangeText={text => setPassword(text)}
              style={styles.FieldStyle}
              placeholder="Enter Password"
              placeholderTextColor={'black'}
            />
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: 'purple',
            width: 200,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Register
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default RegisterScreen;
