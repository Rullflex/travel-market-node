import type { DealData } from '@/routes/types.js'

export function formatPreorderComment(data: DealData, preorderName: string): string {
  return [
    `ID сделки Bitrix: ${data.deal_id}`,
    `Название сделки Bitrix: ${preorderName}`,
    `Тип услуги: ${data.deal_type ?? 'Не указано'}`,
    `Формат тура: ${data.tour_format ?? 'Не указано'}`,
    `Дата начала тура: ${data.tour_start_date ?? 'Не указано'}`,
    `Дата окончания тура: ${data.tour_end_date ?? 'Не указано'}`,
    `Стоимость тура: ${data.tour_price ?? 'Не указано'}`,
  ].join('\n')
}
