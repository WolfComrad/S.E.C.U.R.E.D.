import React from 'react';
import { Text, View, Pressable } from 'react-native';
import {useNavigation} from '@react-navigation/native'



const HomeScreen = () => {

  const navigation = useNavigation()
  return (
    <View>
      <Text>This is our Home screen!</Text>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('Register');
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
            Back to Login!
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
