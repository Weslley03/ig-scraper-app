import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data.response,
  (error) => {
    const store = useAuthStore.getState()
    if (error.response?.status === 401 && store.token) {
      store.logout()
    }
    const message = error.response?.data?.message ?? 'Erro desconhecido.'
    return Promise.reject(new Error(message))
  },
)

export default http
