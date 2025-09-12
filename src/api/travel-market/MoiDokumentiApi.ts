import type { CreatePreorderParams, GetPreordersParams, Payment, PaymentParams, Preorder, TempTourist, Tour, Tourist, TouristParams, TourParams } from './types.js'
import { http } from './http.js'

export const MoiDokumentiApi = {
  getTourists: <T extends (keyof Tourist)[]>(params?: TouristParams<T>) => {
    return http.post<{ [K in T[number]]: Tourist[K] }[]>('get-tourist-list', params)
  },
  addTourist: (params: Partial<Omit<Tourist, 'id'>>) => {
    return http.post<undefined>('add-tourist', params)
  },
  /**
   * Обновляет данные туриста, полностью заменяя их новыми, обнуляя старые если данные не переданы.
   * Для того чтобы обновить часть данных, не изменяя старые используйте updateTouristKeepingOld
   */
  updateTourist: (params: Partial<Tourist>) => {
    return http.post<undefined>('edit-tourist', params)
  },
  updateTouristKeepingOld: async (newData: Partial<Tourist> & { id: number }) => {
    const { data: oldData } = await MoiDokumentiApi.getTourists({ id: newData.id, fields: ['id', 'name', 'name_lat', 'address', 'tel', 'dr', 'passport_series', 'passport_number', 'passport_who', 'passport_when', 'passport_till', 'gender', 'email', 'passport_series_rus', 'passport_number_rus', 'passport_who_rus', 'passport_when_rus', 'receive_sms', 'receive_email', 'manager_id', 'office_id'] })

    if (oldData.length === 0) {
      throw new Error(`Попытка обновить несуществующего туриста с ID ${newData.id}`)
    }

    return MoiDokumentiApi.updateTourist({ ...oldData[0], ...newData })
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
