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

export interface TourData {
  deal_id: string

  country: string // Страна
  dates: string // Даты поездки
  tourists: string // Туристы по туру
  tour_operator: string // Туроператор
  contract_cost: string // Стоимость договора для туриста
  payment_terms: string // Сроки оплаты (если оплачен не полностью)
  contract_number: string // Номер договора
  contract_name: string // Название договора
  tour_operator_cost: string // Стоимость оплаты ТурОператору
  commission: string // Комиссия по туру
}

export interface TourFullPaymentOperatorData {
  deal_id: string
  cost: string
  comission: string
}
