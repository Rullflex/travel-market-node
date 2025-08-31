export interface DealData {
  phone?: string
  email?: string
  first_name?: string
  last_name?: string

  deal_id: string
  deal_name?: string
  deal_type?: string

  tour_format?: string
  tour_start_date?: string
  tour_end_date?: string
  tour_price?: string
}

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
