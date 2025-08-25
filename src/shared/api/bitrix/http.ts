import axios from 'axios'
import { BITRIX_WEBHOOK_URL } from '@/shared/const'

export const http = axios.create({
  baseURL: BITRIX_WEBHOOK_URL,
})
