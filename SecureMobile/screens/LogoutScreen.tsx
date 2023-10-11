import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  PanResponder,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens, screens} from './ScreenRoutes';
import {styles} from '../styles/styles';
const LogoutScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any, Screens>>();

  // Initialize PanResponder
  // Initialize PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true, // Always capture initial touch
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Ignore horizontal swipes by checking if the vertical swipe distance is greater
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: () => {
      // Handle any custom behavior for vertical swipes (optional)
    },
    onPanResponderRelease: () => {
      // This block is executed when a tap or vertical swipe is released
      // You can add custom actions here, but for your case, keep it empty
    },
  });

  const handleLogout = async () => {
    setLoading(true);
    const response = await axios.post(apiRoutes.logout);
    if (response.status !== 200) {
      Alert.alert('error logging out', response.status.toString());
      return;
    }
    console.log(response.status);
    await AsyncStorage.removeItem('authToken');
    console.log(await AsyncStorage.getItem('authToken'));
    setLoading(false);
    navigation.push(screens.login);
  };
  return (
    <View style={styles.screenContainer} {...panResponder.panHandlers}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <Pressable style={styles.loginButton} onPress={handleLogout}>
          <Text style={styles.text}>logout</Text>
        </Pressable>
      )}
    </View>
  );
};

export default LogoutScreen;
