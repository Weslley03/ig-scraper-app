import { create } from 'zustand'
import type { LoginRequestDTO, RegisterRequestDTO } from '../types/api'
import { login as authLogin, register as authRegister } from '../services/auth/auth'

interface AuthState {
  token: string | null
  userId: string | null
  isAuthenticated: boolean
  login(dto: LoginRequestDTO): Promise<void>
  register(dto: RegisterRequestDTO): Promise<void>
  logout(): void
  rehydrate(): void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  isAuthenticated: false,

  async login(dto) {
    const data = await authLogin(dto)
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    set({ token: data.token, userId: data.userId, isAuthenticated: true })
  },

  async register(dto) {
    const data = await authRegister(dto)
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    set({ token: data.token, userId: data.userId, isAuthenticated: true })
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    set({ token: null, userId: null, isAuthenticated: false })
    window.location.replace('/access')
  },

  rehydrate() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      set({ token, userId, isAuthenticated: true })
    }
  },
}))
