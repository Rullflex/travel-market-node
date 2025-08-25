export type TouristFields = keyof Tourist

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
  passport_when: Date
  passport_till: Date

  // Российский паспорт
  passport_series_rus: string
  passport_number_rus: string
  passport_who_rus: string
  passport_when_rus: Date

  // Личные данные
  dr: Date // дата рождения
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
