import config from './config'
import axios from '@/plugins/axios'

export const getToken = () => {
  let token = window.localStorage.getItem(config.tokenKey);
  if (token == 'undefined') {
    token = null
  }

  return token
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(config.tokenKey, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(config.tokenKey);
};

export default { getToken, saveToken, destroyToken };
