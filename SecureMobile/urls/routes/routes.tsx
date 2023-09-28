import {JACOBS_IP, MARCOS_IP} from '../url';
const IP = JACOBS_IP;
export const apiRoutes = {
  login: `${IP}/api/Authorization/login/`,
  register: `${IP}/api/Authorization/register`,
  logout: `${IP}/api/Authorization/logout`,
  whoami: `${IP}/api/Authorization/whoami`,
  chats: `${IP}/api/Message`,
  fetchFriends: `${IP}/api/Users/friends/`,
  fetchUsers: `${IP}/api/Users/getusers`,
  friendRequest: `${IP}/api/friendrequest/send`,
  fetchFriendRequest: `${IP}/api/friendrequest/get-requests/`,
  acceptFriendRequest: `${IP}/api/friendrequest/accept/`,
} as const;
