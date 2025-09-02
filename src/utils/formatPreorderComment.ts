import type { BitrixDeal } from '@/api/bitrix/types.js'

export function formatPreorderComment(deal: BitrixDeal): string {
  return [
    `ID сделки Bitrix: ${deal.ID}`,
    `Ссылка на сделку Bitrix: https://kupin-travel.bitrix24.ru/crm/deal/details/${deal.ID}`,
    `Название сделки Bitrix: ${deal.TITLE ?? 'Без названия сделки'}: ПОДГОТОВКА ДОКУМЕНТОВ ИЗ БИТРИКСА`,
    `Тип услуги: ${deal.UF_CRM_1734090132316 ?? 'Не указано'}`,
    `Формат тура: ${deal.UF_CRM_1734090442060 ?? 'Не указано'}`,
    `Дата начала тура: ${deal.UF_CRM_1734090826 ?? 'Не указано'}`,
    `Дата окончания тура: ${deal.UF_CRM_1734090894 ?? 'Не указано'}`,
    `Стоимость тура: ${deal.UF_CRM_1737025764412 ?? 'Не указано'}`,
  ].join('\n')
}
