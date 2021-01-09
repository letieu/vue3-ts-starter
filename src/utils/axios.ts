import axios from '@/plugins/axios'

export function setTokenHeader(token: string) {
  axios.defaults.headers.common["Authorization"] = "Token " + token;
}

export function deleteTokenHeader() {
  axios.defaults.headers.common["Authorization"] = "";
}

export default {
  setTokenHeader,
  deleteTokenHeader
}
