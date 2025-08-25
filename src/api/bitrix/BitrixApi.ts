import { http } from './http'

export const BitrixApi = {
  updateDeal: (dealId: number, fields: { [key: string]: any }) => http.post('crm.deal.update', {
    id: dealId,
    fields,
  }),
}
