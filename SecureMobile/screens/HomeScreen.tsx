import React from 'react';
import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HomeScreen() {
  const [text, onChangeText] = useState('');

  return (
    <SafeAreaView>
      <Text style={{fontSize: 17, fontWeight: '600', color: 'gray'}}>
        Email
      </Text>

      <TextInput placeholder='type here' value={text} onChangeText={onChangeText}/>
    </SafeAreaView>
  );
}

export default HomeScreen;
