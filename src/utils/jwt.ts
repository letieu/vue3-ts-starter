import config from './config'
import axios from '@/plugins/axios'

export const getToken = () => {
  return window.localStorage.getItem(config.tokenKey);
};

export const saveToken = (token: string) => {
  window.localStorage.setItem(config.tokenKey, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(config.tokenKey);
};

export default { getToken, saveToken, destroyToken };
