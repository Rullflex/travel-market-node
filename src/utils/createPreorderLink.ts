import { MOIDOKUMENTI_BASE_URL } from '@/const/index.js'

export function createPreorderLink(preorderId: number) {
  return `${MOIDOKUMENTI_BASE_URL}/preorders/index/pid/${preorderId}`
}
