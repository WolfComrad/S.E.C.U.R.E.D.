import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserDto} from '../types';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

const User = (item: UserDto) => {
  return (
    <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 50, height: 50, borderRadius: 25}}
          source={require('../assets/tux.jpg')}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, color: 'black'}}>{item.userName}</Text>
        <Text>{item.email}</Text>
      </View>
      <View>
        <Pressable
          style={{backgroundColor: 'purple', padding: 8, borderRadius: 20}}
          onPress={() => console.log(`Added ${item.userName}`)}>
          <Text style={{color: 'white'}}>Add Friend</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default User;
