import type { TourData } from '@/routes/types'
import { BitrixApi } from '@/api/bitrix'
import { TOUR_CONFIRMED_STAGE } from '@/const'

export async function tourConfirm(data: TourData) {
  const comment = [
    'Информация о подтверждении тура:',
    `Страна: ${data.country}`,
    `Даты поездки: ${data.dates}`,
    `Туристы: ${data.tourists}`,
    `Туроператор: ${data.tour_operator}`,
    `Стоимость договора для туриста: ${data.contract_cost}`,
    `Сроки оплаты: ${data.payment_terms}`,
    `Номер договора: ${data.contract_number}`,
    `Название договора: ${data.contract_name}`,
    `Стоимость оплаты туроператору: ${data.tour_operator_cost}`,
    `Комиссия по туру: ${data.commission}`,
  ].join('\n')

  try {
    await BitrixApi.updateDeal(data.deal_id, {
      COMMENTS: comment, // TODO куда записывать данные
      STAGE_ID: TOUR_CONFIRMED_STAGE,
    })

    return { success: true }
  } catch (error) {
    console.error('Ошибка при обновлении сделки:', error)
    throw new Error('Не удалось обновить сделку в Bitrix')
  }
}
