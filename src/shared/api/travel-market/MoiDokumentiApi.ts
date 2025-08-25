import type { Payment, PaymentParams, Tourist, TouristParams } from './types'
import { http } from './http'

export const MoiDokumentiApi = {
  getTourists: <T extends (keyof Tourist)[]>(params: TouristParams) => {
    return http.post<{ [K in T[number]]: Tourist[K] }[]>('get-tourist-list', params)
  },
  getPayments: (params?: PaymentParams) => http.post<Payment[]>('get-payment-list', params),
}
