export interface RegisterPayload {
  username: string
  password: string
  email: string
}

export interface LoginPayload {
  password: string
  email: string
}

export interface User {
  email: string
  token?: string
  username: string
  image: string
}
