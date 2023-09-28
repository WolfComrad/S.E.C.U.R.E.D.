import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles/styles';
import axios from 'axios';
import {apiRoutes} from '../urls/routes/routes';
import {FriendRequestDto} from '../types';
import {useUser} from '../UserContext';
const FriendRequestScreen = () => {
  const {userId} = useUser();
  const [friendRequest, setFriendRequest] = useState<FriendRequestDto[]>([]);
  useEffect(() => {
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

  return (
    <View style={styles.RegisterScreenStyle}>
      <Text>
        {friendRequest.map((value, index) => (
          <View key={index}>
            <Text>{value.userName}</Text>
          </View>
        ))}
      </Text>
    </View>
  );
};

export default FriendRequestScreen;
