import type { TourFullPaymentOperatorData } from '@/routes/types'
import { BitrixApi } from '@/api/bitrix'
import { TOUR_PAID_TO_OPERATOR_STAGE } from '@/const'

export async function tourFullPaymentOperator({ dealId, cost, comission }: TourFullPaymentOperatorData) {
  const comment = [
    'Информация об оплате тура оператору:',
    `Стоимость оплаты туроператору: ${cost}`,
    `Комиссия по туру: ${comission}`,
  ].join('\n')

  try {
    await BitrixApi.updateDeal(Number(dealId), {
      COMMENTS: comment, // TODO куда записывать данные
      STAGE_ID: TOUR_PAID_TO_OPERATOR_STAGE,
    })

    return { success: true }
  } catch (error) {
    console.error('Ошибка при обновлении сделки:', error)
    throw new Error('Не удалось обновить сделку в Bitrix')
  }
}
