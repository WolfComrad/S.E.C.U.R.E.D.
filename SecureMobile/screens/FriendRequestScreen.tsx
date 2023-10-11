import {
  View,
  ScrollView,
  Pressable,
  Text,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {FriendRequestDto} from '../types';
import {useUser} from '../UserContext';
import FriendRequest from '../components/FriendRequest';
import {useNavigation} from '@react-navigation/native';
const FriendRequestScreen = () => {
  const {userId} = useUser();
  const [friendRequest, setFriendRequest] = useState<FriendRequestDto[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
    const fetchFriendRequest = async () => {
      const response = await axios.get<FriendRequestDto[]>(
        apiRoutes.fetchFriendRequest + userId,
      );
      if (response.status !== 200) {
        return;
      } else {
        console.log(response.data);
        setFriendRequest(response.data);
      }
    };
    fetchFriendRequest();
  }, []);
  const acceptFriendRequest = async (item: FriendRequestDto) => {
    const response = await axios.post(apiRoutes.acceptFriendRequest + item.id);
    if (response.status !== 200) {
      return;
    }
    const responseRefreshedRequest = await axios.get<FriendRequestDto[]>(
      apiRoutes.fetchFriendRequest + userId,
    );
    if (responseRefreshedRequest.status !== 200) {
      return;
    } else {
      console.log(responseRefreshedRequest.data);
      setFriendRequest(responseRefreshedRequest.data);
    }
    console.log(responseRefreshedRequest.data);
  };

  return (
    <View>
      <ScrollView>
        {friendRequest.map((value, index) => (
          <View key={index}>
            <FriendRequest
              item={value}
              handleRerender={() => acceptFriendRequest(value)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendRequestScreen;


