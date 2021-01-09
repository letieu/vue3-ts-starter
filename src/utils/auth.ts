import { useAuthStore } from '@/store/auth'
import jwtUtil from './jwt'
import axiosUtil from './axios'
import axios from "@/plugins/axios"

export async function me() {
  const token = jwtUtil.getToken()
  if (!token) {
    return
  }

  axiosUtil.setTokenHeader(token)
  const res = await axios.get('/user')
  useAuthStore().user = res.data.user

  jwtUtil.saveToken(res.data.user.token)
  axiosUtil.setTokenHeader(res.data.user.token)
}
