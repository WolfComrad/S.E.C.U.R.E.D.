import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

export type UserDto = {
  id: Int32;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  twoFactorEnabled: boolean;
};

export type FriendRequestDto = {
  id: Int32;
  senderId: Int32;
  receiverId: Int32;
  userName: string;
};
