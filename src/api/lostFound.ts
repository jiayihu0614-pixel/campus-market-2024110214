import http from './http'

export interface NewLostFound {
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  time: string
  contact: string
  description: string
  status: string
  image?: string
}

export function getLostFounds() {
  return http.get('/lostFounds')
}

export function createLostFound(data: NewLostFound) {
  return http.post('/lostFounds', data)
}
