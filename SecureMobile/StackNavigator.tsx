import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatsScreen from './screens/ChatsScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';
import LogoutScreen from './screens/LogoutScreen';
import FriendScreen from './screens/FriendScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Friend"
        component={FriendScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="FriendRequest"
        component={FriendRequestScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
