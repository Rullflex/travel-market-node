import type { BitrixContact, BitrixDeal, BitrixResponse } from './types.js'
import { http } from './http.js'

export const BitrixApi = {
  getDeal: (dealId: string) => http.post<BitrixResponse<BitrixDeal>>('crm.deal.get', { id: dealId }),
  updateDeal: (dealId: string, fields: Partial<BitrixDeal>) => http.post('crm.deal.update', {
    id: dealId,
    fields,
  }),

  getContact: (contactId: string) => http.post<BitrixResponse<BitrixContact>>('crm.contact.get', { id: contactId }),
}
