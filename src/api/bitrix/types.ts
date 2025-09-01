export interface BitrixResponse<R> {
  result: R
  time: {
    start: number
    finish: number
    duration: number
    processing: number
    date_start: string
    date_finish: string
    operating: number
  }
}

export interface BitrixDeal {
  ID: string
  TITLE: string
  TYPE_ID: string
  STAGE_ID: string
  PROBABILITY: string
  CURRENCY_ID: string
  OPPORTUNITY: string
  IS_MANUAL_OPPORTUNITY: 'Y' | 'N'
  TAX_VALUE: string
  LEAD_ID: string | null
  COMPANY_ID: string
  CONTACT_IDS: string[]
  QUOTE_ID: string | null
  BEGINDATE: string
  CLOSEDATE: string
  ASSIGNED_BY_ID: string
  CREATED_BY_ID: string
  MODIFY_BY_ID: string
  DATE_CREATE: string
  DATE_MODIFY: string
  OPENED: 'Y' | 'N'
  CLOSED: 'Y' | 'N'
  COMMENTS: string | null
  ADDITIONAL_INFO: string | null
  LOCATION_ID: string | null
  CATEGORY_ID: string
  STAGE_SEMANTIC_ID: string
  IS_NEW: 'Y' | 'N'
  IS_RECURRING: 'Y' | 'N'
  IS_RETURN_CUSTOMER: 'Y' | 'N'
  IS_REPEATED_APPROACH: 'Y' | 'N'
  SOURCE_ID: string | null
  SOURCE_DESCRIPTION: string | null
  ORIGINATOR_ID: string | null
  ORIGIN_ID: string | null
  MOVED_BY_ID: string
  MOVED_TIME: string
  LAST_ACTIVITY_TIME: string
  UTM_SOURCE: string | null
  UTM_MEDIUM: string | null
  UTM_CAMPAIGN: string | null
  UTM_CONTENT: string | null
  UTM_TERM: string | null
  LAST_ACTIVITY_BY?: string
  [key: `UF_CRM_${string}`]: string | null | undefined // под все кастомные UF_ поля
}

export interface BitrixContact {
  ID: string
  POST: string | null
  COMMENTS: string | null
  HONORIFIC: string | null
  NAME: string | null
  SECOND_NAME: string | null
  LAST_NAME: string | null
  PHOTO: string | null
  LEAD_ID: string | null
  TYPE_ID: string | null
  SOURCE_ID: string | null
  SOURCE_DESCRIPTION: string | null
  COMPANY_ID: string | null
  BIRTHDATE: string | null // ISO date string
  EXPORT: YesNo
  HAS_PHONE: YesNo
  HAS_EMAIL: YesNo
  HAS_IMOL: YesNo
  DATE_CREATE: string
  DATE_MODIFY: string
  ASSIGNED_BY_ID: string
  CREATED_BY_ID: string
  MODIFY_BY_ID: string
  OPENED: YesNo
  ORIGINATOR_ID: string | null
  ORIGIN_ID: string | null
  ORIGIN_VERSION: string | null
  FACE_ID: string | null
  LAST_ACTIVITY_TIME: string
  ADDRESS: string | null
  ADDRESS_2: string | null
  ADDRESS_CITY: string | null
  ADDRESS_POSTAL_CODE: string | null
  ADDRESS_REGION: string | null
  ADDRESS_PROVINCE: string | null
  ADDRESS_COUNTRY: string | null
  ADDRESS_LOC_ADDR_ID: string | null
  UTM_SOURCE: string | null
  UTM_MEDIUM: string | null
  UTM_CAMPAIGN: string | null
  UTM_CONTENT: string | null
  UTM_TERM: string | null
  PARENT_ID_1224?: string
  LAST_ACTIVITY_BY?: string
  [key: `UF_CRM_${string}`]: string | null | undefined // кастомные поля
  PHONE?: BitrixMultifield[]
  EMAIL?: BitrixMultifield[]
}

type YesNo = 'Y' | 'N'

interface BitrixMultifield {
  ID: string
  VALUE_TYPE: string // например: "WORK", "HOME", "MAILING"
  VALUE: string
  TYPE_ID: 'PHONE' | 'EMAIL' | string
}
