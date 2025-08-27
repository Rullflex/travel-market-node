import type { TourFullPaymentData } from '@/routes/types.js'
import { MoiDokumentiApi } from '@/api/travel-market/index.js'

export async function tourFullPayment(data: TourFullPaymentData) {
  console.log('DATA:', data)

  const res = await MoiDokumentiApi.getTours({
    tour_id: Number(data.tour_id),
    fields: ['docs', 'tour_id', 'comission_tourist', 'comission_touroperator'],
  })

  console.log('getTours:', res.data)

  //   await BitrixApi.updateDeal(data.deal_id, {
  //     // TODO список полей для заполнения
  //     STAGE_ID: TOUR_PAID_TO_OPERATOR_STAGE,
  //   })
}
