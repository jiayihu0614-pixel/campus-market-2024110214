import http from './http'

export interface UserRecord {
  id?: number
  username: string
  password: string
  name: string
  college: string
  grade: string
  campus: string
  avatar: string
  bio: string
}

export function getUsers() {
  return http.get<UserRecord[]>('/users')
}

export function createUser(data: UserRecord) {
  return http.post<UserRecord>('/users', data)
}
