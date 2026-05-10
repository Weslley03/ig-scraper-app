export interface ResponseApiDTO<T> {
  status: number
  message: string
  response: T
}

export interface AuthResponseDTO {
  token: string
  userId: string
}

export interface LoginRequestDTO {
  email: string
  password: string
}

export interface RegisterRequestDTO {
  name: string
  email: string
  password: string
}

export interface InstagramCommentsParams {
  url: string
}

export interface CommentAnalysisHistoryResponseDTO {
  id: number
  analysisId: number
  userId: string
  label: string
  verdict: string
  createdAt: string
  updatedAt: string
}
