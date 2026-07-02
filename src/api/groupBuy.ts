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
  image?: string
}

export function getGroupBuys() {
  return http.get('/groupBuys')
}

export function getGroupBuy(id: number | string) {
  return http.get<NewGroupBuy & { id: number }>(`/groupBuys/${id}`)
}

export function createGroupBuy(data: NewGroupBuy) {
  return http.post('/groupBuys', data)
}

export function updateGroupBuy(id: number | string, data: Partial<NewGroupBuy>) {
  return http.patch<NewGroupBuy & { id: number }>(`/groupBuys/${id}`, data)
}
