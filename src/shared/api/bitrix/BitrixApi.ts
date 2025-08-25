import { http } from './http'

export const BitrixApi = {
  getDealList: () => http.post('crm.deal.list', { filter: { '>ID': 0 }, select: ['ID', 'TITLE'] }),
}
