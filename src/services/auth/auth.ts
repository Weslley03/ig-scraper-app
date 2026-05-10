import http from '../http'
import type { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO } from '../../types/api'

export async function login(dto: LoginRequestDTO): Promise<AuthResponseDTO> {
  return http.post('/auth/login', dto)
}

export async function register(dto: RegisterRequestDTO): Promise<AuthResponseDTO> {
  return http.post('/auth/register', dto)
}
