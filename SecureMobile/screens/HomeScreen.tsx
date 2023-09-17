import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LogoutButton from '../components/LogoutButton';
import {Screens, screens} from './ScreenRoutes';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();
  return (
    <View>
      <View>
        <LogoutButton />
        <Pressable
          onPress={() => {
            navigation.navigate(screens.login);
          }}
          style={{
            marginTop: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
            width: 200,
            backgroundColor: 'purple',
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
