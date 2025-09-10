import type { BitrixDeal } from '@/api/bitrix/index.js'
import type { TempTourist, Tourist } from '@/api/travel-market/types.js'
import { intersectionBy } from 'lodash-es'
import { BitrixApi } from '@/api/bitrix/index.js'
import { MoiDokumentiApi } from '@/api/travel-market/index.js'
import { createPreorderLink, extractDatePart, formatPreorderComment } from '@/utils/index.js'

const processedDeals = new Set<string>()

export async function handleFinalInvoice(dealId: string) {
  const { data: { result: deal } } = await BitrixApi.getDeal(dealId)

  if (deal.STAGE_ID !== 'FINAL_INVOICE' || processedDeals.has(dealId)) {
    return
  }

  processedDeals.add(dealId)

  const { data: { result: contact } } = await BitrixApi.getContact(deal.CONTACT_ID)
  const phone = contact.PHONE?.[0]?.VALUE
  const email = contact.EMAIL?.[0]?.VALUE
  const birthDate = contact.BIRTHDATE && extractDatePart(contact.BIRTHDATE)

  if (!phone || !email || !birthDate) {
    throw new Error(`У контакта с ID ${deal.CONTACT_ID} нет телефона, email или даты рождения`)
  }

  const fullName = [contact.LAST_NAME, contact.NAME].filter(Boolean).join(' ').trim() || 'Неизвестный турист'
  const finalTouristId = await findFinalTouristId(phone, email, birthDate, fullName)

  if (!finalTouristId) {
    throw new Error('Не удалось создать туриста')
  }

  // Создаем обращение
  const addPreorderResponse = await createPreorder(finalTouristId, deal)
  const preorderUrl = createPreorderLink(addPreorderResponse.preorder_id || -1)

  // Обновляем сделку в Битрикс24
  await BitrixApi.updateDeal(dealId, {
    UF_CRM_1753433653919: preorderUrl,
  })

  return {
    dealId,
    dealStage: deal.STAGE_ID,
    contactId: contact.ID,
    preorderId: addPreorderResponse.preorder_id,
    finalTouristId,
  }
}

async function findFinalTouristId(phone: string, email: string, birthDate: string, newFullName?: string) {
  const tourist = await findParticularTourist(phone, email, birthDate)

  if (tourist) {
    await MoiDokumentiApi.updateTourist(tourist) // Обновляем данные туриста где могли не совпасть или отсутствовали имя, телефон, email
    return tourist.id
  }

  const tempTourist = await findParticularTempTourist(phone, email)

  if (tempTourist) {
    return await convertTempTourist(tempTourist, birthDate)
  }

  return await createTourist({
    name: newFullName,
    tel: phone,
    email,
    dr: birthDate,
  })
}

async function findParticularTourist(phone: string, email: string, birthDate: string) {
  const [touristsByPhone, touristsByEmail] = await Promise.all([searchTourists(phone), searchTourists(email)])
  const matchByBirthDate = (t: Awaited<ReturnType<typeof searchTourists>>[0]) => t.dr === birthDate
  const byPhoneAndEmail = intersectionBy(touristsByPhone, touristsByEmail, 'id')

  if (byPhoneAndEmail.length) {
    const exact = byPhoneAndEmail.find(matchByBirthDate)

    return exact || {
      ...byPhoneAndEmail[0],
      dr: birthDate,
    }
  }

  const byPhoneAndBirthDate = touristsByPhone.find(matchByBirthDate)
  if (byPhoneAndBirthDate) {
    return {
      ...byPhoneAndBirthDate,
      email,
    }
  }

  const byEmailAndBirthDate = touristsByEmail.find(matchByBirthDate)
  if (byEmailAndBirthDate) {
    return {
      ...byEmailAndBirthDate,
      tel: phone,
    }
  }

  return null
}

async function findParticularTempTourist(phone: string, email: string) {
  const [tempTouristsByPhone, tempTouristsByEmail] = await Promise.all([searchTempTourists(phone), searchTempTourists(email)])
  const tempTourists = intersectionBy(tempTouristsByPhone, tempTouristsByEmail, 'id')

  return tempTourists.length ? tempTourists[0] : null
}

async function searchTourists(phoneOrEmail: string) {
  return MoiDokumentiApi.getTourists({
    fields: ['id', 'name', 'tel', 'email', 'dr', 'manager_id', 'office_id'],
    search: phoneOrEmail,
  }).then(res => res.data)
}

async function searchTempTourists(phoneOrEmail: string) {
  return MoiDokumentiApi.getTempTourists({
    fields: ['id', 'name', 'tel', 'email', 'manager_id', 'office_id'],
    search: phoneOrEmail,
  }).then(res => res.data)
}

async function createTourist(touristData: Partial<Tourist>) {
  await MoiDokumentiApi.addTourist(touristData)
  const { data } = await MoiDokumentiApi.getTourists({ search: touristData.tel || touristData.email || touristData.name, fields: ['id'] })

  return data[data.length - 1].id
}

async function convertTempTourist(tempTourist: TempTourist, dr: string) {
  await MoiDokumentiApi.deleteTempTourist(tempTourist.id)

  return createTourist({
    name: tempTourist.name,
    tel: tempTourist.tel,
    email: tempTourist.email,
    dr,
    manager_id: tempTourist.manager_id,
    office_id: tempTourist.office_id,
  })
}

async function createPreorder(touristId: number, deal: BitrixDeal) {
  await MoiDokumentiApi.createPreorder({
    tourist_type: 'tourist',
    tourist_id: touristId,
    comment: formatPreorderComment(deal),
  })

  const response = await MoiDokumentiApi.getPreorders({ tourist_id: touristId, fields: ['preorder_id'] })

  return response.data[response.data.length - 1]
}
