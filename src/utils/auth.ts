import { useAuthStore } from '@/store/auth'
import jwtUtil from './jwt'
import axiosUtil from './axios'
import axios from "@/plugins/axios"

export async function me() {
  const token = jwtUtil.getToken()
  console.log(token)
  if (!token) {
    return
  }

  axiosUtil.setTokenHeader(token)

  const res = await axios.get('/auth/me')
  useAuthStore().user = res.data.user
}
