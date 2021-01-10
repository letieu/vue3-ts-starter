import { defineStore } from "pinia";
import axios from "@/plugins/axios"
import { RegisterPayload, LoginPayload, User } from "@/types/auth.types"
import jwtUtil from "@/utils/jwt"
import axiosUtil from "@/utils/axios"

interface AuthState {
  user: User | null
  error: Object | string
}

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): AuthState => ({
    user: null,
    error: ''
  }),

  getters: {
    getError() {
      if (this.error instanceof String || typeof this.error == 'string') {
        return { error: [this.error] }
      }

      return this.error
    }
  },

  actions: {
    logout() {
      this.user = null
      jwtUtil.destroyToken()
      axiosUtil.deleteTokenHeader()
    },

    async login(payload: LoginPayload): Promise<boolean> {
      try {
        const res = await axios.post("/auth/login", {
          user: payload
        })
        this.user = res.data.user

        jwtUtil.saveToken(res.data.user.token)
        axiosUtil.setTokenHeader(res.data.user.token)
        return true
      } catch (e) {
        this.error = e.response.data.error
        return false
      }
    },

    async register(payload: RegisterPayload): Promise<boolean> {
      axiosUtil.deleteTokenHeader()

      try {
        const res = await axios.post("/auth/register", {
          user: payload
        })

        this.user = res.data.user
        jwtUtil.saveToken(res.data.user.token)
        axiosUtil.setTokenHeader(res.data.user.token)

        return true
      } catch (error) {
        this.error = error.response.data.error
        return false
      }
    }
  }
})
