export interface TourFullPaymentData {
  event_type: 'tour_full_payment_operator' | 'tour_full_payment_tourist'

  tour_id: string

  country: string // Страна отдыха
  tour_date_start: string // Дата начала тура
  tour_date_end: string // Дата окончания тура
  tourists: string // Список туристов по туру через запятую
  tour_operator: string // Туроператор по туру
  tour_tourist_cost: string // Стоимость тура для туриста
  tour_payment_date: string // Срок полной оплаты по туру туристом
  tour_operator_cost: string // Стоимость тура у туроператора
  tour_contract_number: string // Номер договора по туру
  tour_name: string // Название тура
}

export type BitrixDealEvent = BitrixDealUpdateEvent | BitrixDealMoveToCategoryEvent

export interface BitrixDealUpdateEvent {
  event: 'ONCRMDEALUPDATE'
  event_handler_id: string
  data: {
    FIELDS: {
      ID: string
    }
  }
  ts: string
  auth: BitrixAuth
}

export interface BitrixDealMoveToCategoryEvent {
  event: 'ONCRMDEALMOVETOCATEGORY'
  event_handler_id: string
  data: {
    FIELDS: {
      ID: string
      CATEGORY_ID: string
      STAGE_ID: string
    }
  }
  ts: string
  auth: BitrixAuth
}

interface BitrixAuth {
  access_token: string
  expires_in: string // Bitrix возвращает строку
  scope: string
  domain: string
  server_endpoint: string
  status: string
  client_endpoint: string
  member_id: string
  refresh_token: string
  application_token: string
}
