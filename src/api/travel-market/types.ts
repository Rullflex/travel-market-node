export interface PaginationParams {
  count?: number // Количество записей на странице (по умолчанию 20, максимум 100)
  offset?: number // Смещение от начала списка (по умолчанию 0)
  order_desc?: boolean // Сортировка по убыванию (по умолчанию false)
}

export type TouristParams<F> = Omit<PaginationParams, 'order_desc'> & {
  search?: string // Строка для поиска по имени, телефону
  fields?: F // Поля, которые нужно вернуть в ответе (по умолчанию name)
  id?: number // Фильтр по идентификатору туриста
  manager_id?: number // Фильтр по идентификатору менеджера
  office_id?: number // Фильтр по идентификатору офиса
}

export interface TempTourist {
  id: number
  name: string
  tel: string
  email: string
  manager_id?: number
  office_id?: number
  manager_name?: string
  office_name?: string
}

export interface Tourist {
  // Идентификаторы (числовые)
  id: number
  manager_id: number
  office_id: number

  // Имена и контактные данные
  name: string
  name_lat: string
  tel: string
  email: string
  address: string

  // Паспортные данные
  passport_series: string
  passport_number: string
  passport_who: string
  passport_when: string // формат: 'DD-MM-YYYY'
  passport_till: string // формат: 'DD-MM-YYYY'

  // Российский паспорт
  passport_series_rus: string
  passport_number_rus: string
  passport_who_rus: string
  passport_when_rus: string // формат: 'DD-MM-YYYY'

  // Личные данные
  dr: string // дата рождения, формат: 'YYYY-MM-DD'
  gender: 'male' | 'female'

  // Настройки уведомлений
  receive_sms: boolean
  receive_email: boolean

  // Связанные данные
  manager_name: string
  office_name: string

  // Дополнительная информация
  comments: string
}

export type PaymentParams = Partial<Omit<Payment, 'payment_id' | 'amount' | 'exchange_rate' | 'comission' | 'comment' | 'payment_date' | 'payment_create_date'>
  & PaginationParams>

export interface PreorderParams {
  tourist_type: 'tourist' | 'tourist_temp'
  tourist_id: number
  flightdate_from?: string
  flightdate_to?: string
  persons?: number
  children?: number
  children_ages?: number[]
  price_from?: number
  price_to?: number
  comment?: string
  source?: string
}

export interface Preorder {
  preorder_id: number
  tourist_id: number
  manager_id: number
  // другие поля могут быть добавлены по мере необходимости
}

export interface Payment {
  // Идентификаторы
  payment_id: number
  order_id: number
  tourist_id: number
  tour_id: number
  manager_id: number

  // Даты
  payment_date: string // формат: 'YYYY-MM-DD HH:mm:ss'
  payment_create_date: string // формат: 'YYYY-MM-DD HH:mm:ss'

  // Финансовые данные
  amount: string // десятичное число в строковом формате
  exchange_rate: string // десятичное число в строковом формате
  comission: string // десятичное число в строковом формате

  // Тип и направление платежа
  payment_direction: 'in' | 'out'
  payment_type: 'cash' | 'card' | 'bank' // можно расширить при необходимости
  tourist_type: 'tourist' | 'agent' // можно расширить при необходимости

  // Дополнительная информация
  comment: string
}

export interface Tour {
  tour_id: number
  docs: string
  comission_tourist: string
  comission_touroperator: string
}

export type TourParams<F> = PaginationParams & {
  fields?: F
  tour_id?: number
  tourist_id?: number
}
