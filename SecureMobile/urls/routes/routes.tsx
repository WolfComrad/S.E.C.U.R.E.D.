import {JACOBS_IP, MARCOS_IP} from '../url';
const IP = MARCOS_IP
export const apiRoutes = {
  login: `${IP}/api/Authorization/login/`,
  register: `${IP}/api/Authorization/register`,
  logout: `${IP}/api/Authorization/logout`,
  whoami: `${IP}/api/Authorization/whoami`,
} as const;
