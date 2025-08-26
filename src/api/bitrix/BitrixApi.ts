import { http } from './http'

export const BitrixApi = {
  updateDeal: (dealId: string, fields: { [key: string]: any }) => http.post('crm.deal.update', {
    id: dealId,
    fields,
  }),
}
