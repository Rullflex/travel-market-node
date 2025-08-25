import axios, { toFormData } from 'axios'
import { MOIDOKUMENTI_BASE_URL } from '@/const'

export const http = axios.create({
  baseURL: `${MOIDOKUMENTI_BASE_URL}/api/`,
  params: { key: process.env.MOIDOKUMENTI_API_KEY },
  transformRequest: function transformRequest(data) {
    return toFormData({ params: JSON.stringify(data ?? {}) })
  },

  transformResponse: function transformResponse(data) {
    const response = JSON.parse(data)

    if (response.result === 'auth error') {
      throw new Error(`[MoiDokumenti API]: Ошибка авторизации: ${response.result}`)
    }

    if (response.result === 'error') {
      throw new Error(`[MoiDokumenti API]: ${response.description}`)
    }

    return JSON.parse(data).data
  },
})
