import http from './http'

export interface NewErrand {
  title: string
  taskType: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  publisher: string
  status: string
  description: string
}

export function getErrands() {
  return http.get('/errands')
}

export function createErrand(data: NewErrand) {
  return http.post('/errands', data)
}
