import type { DealData } from '@/routes/types'

export function formatPreorderComment(data: DealData, preorderName: string): string {
  return [
    `Название сделки: ${preorderName}`,
    `Тип услуги: ${data.deal_type ?? 'Не указано'}`,
    `Формат тура: ${data.tour_format ?? 'Не указано'}`,
    `Дата начала тура: ${data.tour_start_date ?? 'Не указано'}`,
    `Дата окончания тура: ${data.tour_end_date ?? 'Не указано'}`,
    `Стоимость тура: ${data.tour_price ?? 'Не указано'}`,
  ].join('\n')
}
