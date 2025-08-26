import type { TourFullPaymentOperatorData } from '@/routes/types.js'
import { BitrixApi } from '@/api/bitrix/index.js'
import { TOUR_PAID_TO_OPERATOR_STAGE } from '@/const/index.js'

export async function tourFullPaymentOperator({ deal_id, cost, comission }: TourFullPaymentOperatorData) {
  const comment = [
    'Информация об оплате тура оператору:',
    `Стоимость оплаты туроператору: ${cost}`,
    `Комиссия по туру: ${comission}`,
  ].join('\n')

  try {
    await BitrixApi.updateDeal(deal_id, {
      COMMENTS: comment, // TODO куда записывать данные
      STAGE_ID: TOUR_PAID_TO_OPERATOR_STAGE,
    })

    return { success: true }
  } catch (error) {
    console.error('Ошибка при обновлении сделки:', error)
    throw new Error('Не удалось обновить сделку в Bitrix')
  }
}
