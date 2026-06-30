import http from './http'

export interface NewTrade {
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishTime: string
  location: string
  image: string
  status: string
  description: string
}

export function getTrades() {
  return http.get('/trades')
}

export function createTrade(data: NewTrade) {
  return http.post('/trades', data)
}
