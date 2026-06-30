import http from './http'

export interface NewGroupBuy {
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: string
  description: string
}

export function getGroupBuys() {
  return http.get('/groupBuys')
}

export function createGroupBuy(data: NewGroupBuy) {
  return http.post('/groupBuys', data)
}
