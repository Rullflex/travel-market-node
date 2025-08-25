import type { Tourist, TouristFields } from './types'
import { http } from './http'

export const MoiDokumentiApi = {
  searchTourists: <T extends TouristFields[]>(search: string, fields: T) => {
    return http.post<{ [K in T[number]]: Tourist[K] }[]>('get-tourist-list', { fields, search })
  },
}
