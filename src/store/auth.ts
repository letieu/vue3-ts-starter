import { defineStore } from "pinia";
import axios from "@/plugins/axios"
import { RegisterPayload, LoginPayload, User } from "@/types/auth.types"
import jwtUtil from "@/utils/jwt"
import axiosUtil from "@/utils/axios"

interface AuthState {
  user: User | null
  error: any
}

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): AuthState => ({
    user: null,
    error: null
  }),

  getters: {
  },

  actions: {
    logout() {
      this.user = null
      jwtUtil.destroyToken()
      axiosUtil.deleteTokenHeader()
    },

    async login(payload: LoginPayload): Promise<boolean> {
      try {
        const res = await axios.post("/users/login", {
          user: payload
        })
        this.user = res.data.user

        jwtUtil.saveToken(res.data.user.token)
        axiosUtil.setTokenHeader(res.data.user.token)
        return true
      } catch (e) {
        this.error = e.response.data.errors
        return false
      }
    },

    async register(payload: RegisterPayload): Promise<boolean> {
      axiosUtil.deleteTokenHeader()

      try {
        const res = await axios.post("/users", {
          user: payload
        })

        this.user = res.data.user
        jwtUtil.saveToken(res.data.user.token)
        axiosUtil.setTokenHeader(res.data.user.token)

        return true
      } catch (error) {
        this.error = error.response.data.errors
        return false
      }
    }
  }
})
