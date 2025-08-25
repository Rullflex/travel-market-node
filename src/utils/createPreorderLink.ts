import { MOIDOKUMENTI_BASE_URL } from '@/const'

export function createPreorderLink(preorderId: number) {
  return `${MOIDOKUMENTI_BASE_URL}/preorders/index/pid/${preorderId}`
}
