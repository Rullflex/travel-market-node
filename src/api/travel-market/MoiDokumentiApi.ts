import type { Payment, PaymentParams, Preorder, PreorderParams, TempTourist, Tourist, TouristParams } from './types.js'
import { http } from './http.js'

export const MoiDokumentiApi = {
  getTourists: <T extends (keyof Tourist)[]>(params?: TouristParams<T>) => {
    return http.post<{ [K in T[number]]: Tourist[K] }[]>('get-tourist-list', params)
  },
  getTempTourists: <T extends (keyof TempTourist)[]>(params?: TouristParams<T>) => {
    return http.post<{ [K in T[number]]: TempTourist[K] }[]>('get-tourist-temp-list', params)
  },
  addTourist: (params: Partial<Tourist>) => {
    return http.post<{ tourist_id: number }>('add-tourist', params)
  },
  deleteTempTourist: (id: number) => {
    return http.post<void>('delete-tourist-temp', { id })
  },
  createPreorder: (params: PreorderParams) => {
    return http.post<Preorder>('create-preorder', params)
  },
  getPayments: (params?: PaymentParams) => http.post<Payment[]>('get-payment-list', params),
}
