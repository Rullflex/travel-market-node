import type { TourFullPaymentData } from '@/routes/types.js'
import { BitrixApi } from '@/api/bitrix/BitrixApi.js'
import { MoiDokumentiApi } from '@/api/travel-market/index.js'

export async function tourFullPayment(data: TourFullPaymentData) {
  const { data: tours } = await MoiDokumentiApi.getTours({
    tour_id: Number(data.tour_id),
    fields: ['comission_tourist', 'preorder_id'],
  })

  if (!tours.length) {
    throw new Error(`Туры по ID ${data.tour_id} не нашлись`)
  }

  const tourPreorderId = tours[tours.length - 1].preorder_id

  if (!tourPreorderId) {
    throw new Error(`Тур по ID ${data.tour_id} не имеет обращений`)
  }

  const { data: preorders } = await MoiDokumentiApi.getPreorders({
    preorder_id: tourPreorderId,
    fields: ['comment'],
  })

  if (!preorders.length) {
    throw new Error(`Обращения по ID ${tourPreorderId} не нашлись`)
  }

  const preorderComment = preorders[preorders.length - 1].comment

  if (!preorderComment) {
    throw new Error(`Обращение по ID ${tourPreorderId} не имеет комментария`)
  }

  const bitrixDealIdMatch = preorderComment.match(/ID сделки Bitrix: (\d+)/)
  const bitrixDealId = bitrixDealIdMatch ? bitrixDealIdMatch[1] : null

  if (!bitrixDealId) {
    throw new Error(`Комментарий обращения по ID ${tourPreorderId} не содержит ID сделки Bitrix`)
  }

  return await BitrixApi.updateDeal(bitrixDealId, {
    UF_CRM_1756466640: data.country,
    UF_CRM_1756466774: `${data.tour_date_start} - ${data.tour_date_end}`,
    UF_CRM_1756466816: data.tourists,
    UF_CRM_1756466847: data.tour_operator,
    UF_CRM_1737025764412: data.tour_tourist_cost,
    UF_CRM_1756467710: data.tour_payment_date,
    UF_CRM_1756467743: data.tour_operator_cost,
    UF_CRM_1756467646: data.tour_contract_number,
    UF_CRM_1756467598: data.tour_name,
    OPPORTUNITY: tours[0].comission_tourist,
    STAGE_ID: data.event_type === 'tour_full_payment_tourist' ? 'UC_UVH8TG' : 'UC_S9VTVS',
  }).catch((error) => {
    throw new Error(`[BitrixApi.updateDeal]: ${error.message}`)
  })
}
