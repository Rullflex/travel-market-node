import axios from 'axios'
import { BITRIX_WEBHOOK_URL } from '@/const/index.js'

export const http = axios.create({
  baseURL: BITRIX_WEBHOOK_URL,
})
