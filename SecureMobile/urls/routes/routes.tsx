import {JACOBS_IP} from '../url';
export const apiRoutes = {
  login: `${JACOBS_IP}/api/Authorization/login/`,
  register: `${JACOBS_IP}/api/Authorization/register`,
  logout: `${JACOBS_IP}/api/Authorization/logout`,
} as const;
