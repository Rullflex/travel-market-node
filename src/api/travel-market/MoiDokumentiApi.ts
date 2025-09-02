import type { CreatePreorderParams, GetPreordersParams, Payment, PaymentParams, Preorder, TempTourist, Tour, Tourist, TouristParams, TourParams } from './types.js'
import { http } from './http.js'

export const MoiDokumentiApi = {
  getTourists: <T extends (keyof Tourist)[]>(params?: TouristParams<T>) => {
    return http.post<{ [K in T[number]]: Tourist[K] }[]>('get-tourist-list', params)
  },
  addTourist: (params: Partial<Tourist>) => {
    return http.post<undefined>('add-tourist', params)
  },

  getTempTourists: <T extends (keyof TempTourist)[]>(params?: TouristParams<T>) => {
    return http.post<{ [K in T[number]]: TempTourist[K] }[]>('get-tourist-temp-list', params)
  },
  deleteTempTourist: (id: number) => {
    return http.post<void>('delete-tourist-temp', { id })
  },

  getPreorders: <T extends (keyof Preorder)[]>(params?: GetPreordersParams<T>) => {
    return http.post<{ [K in T[number]]: Preorder[K] }[]>('get-preorder-list', params)
  },
  createPreorder: (params: CreatePreorderParams) => {
    return http.post<undefined>('create-preorder', params)
  },

  getPayments: (params?: PaymentParams) => http.post<Payment[]>('get-payment-list', params),

  getTours: <T extends (keyof Tour)[]>(params?: TourParams<T>) => {
    return http.post<{ [K in T[number]]: Tour[K] }[]>('get-tour-list', params)
  },
}
