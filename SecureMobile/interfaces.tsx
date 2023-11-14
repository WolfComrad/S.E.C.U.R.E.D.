import {IMessage, User} from 'react-native-gifted-chat/lib/GiftedChat';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {newUserDto} from './types';

export interface Message extends IMessage {
  id: Int32;
  _id: Int32;
  text: string;
  dateCreated: Date;
  senderId: Int32;
  receiverId: Int32;
  newUser?: NewUserDto;
}

export interface NewUserDto extends User {
  _id: Int32;
  name: string;
  email: string;
  avatar: string;
}
