import type { BitrixDeal } from '@/api/bitrix/index.js'
import type { TempTourist, Tourist } from '@/api/travel-market/types.js'
import { BitrixApi } from '@/api/bitrix/index.js'
import { MoiDokumentiApi } from '@/api/travel-market/index.js'
import { createPreorderLink, formatPreorderComment } from '@/utils/index.js'

export async function handleFinalInvoice(dealId: string) {
  const { data: { result: deal } } = await BitrixApi.getDeal(dealId)
  const { data: { result: contact } } = await BitrixApi.getContact(deal.CONTACT_ID)

  let foundTourists: {
    tourists: Awaited<ReturnType<typeof searchTourists>>['tourists']
    temp_tourists: Awaited<ReturnType<typeof searchTourists>>['temp_tourists']
  } = { tourists: [], temp_tourists: [] }

  // Поиск по телефону
  if (contact.PHONE?.length) {
    foundTourists = await searchTourists(contact.PHONE[0].VALUE)
  }

  // Если не найдено по телефону и есть email — ищем по email
  if (!foundTourists.tourists.length && !foundTourists.temp_tourists.length && contact.EMAIL?.length) {
    foundTourists = await searchTourists(contact.EMAIL[0].VALUE)
  }

  let finalTourist: Awaited<ReturnType<typeof createTourist>> | null = null

  // Если никого не нашли - создаем нового туриста
  if (!foundTourists.tourists.length && !foundTourists.temp_tourists.length) {
    const fullName = [contact.LAST_NAME, contact.NAME].filter(Boolean).join(' ').trim()

    finalTourist = await createTourist({
      name: fullName || 'Неизвестный турист',
      tel: contact.PHONE?.[0]?.VALUE || '',
      email: contact.EMAIL?.[0]?.VALUE || '',
    })
  } else {
    if (foundTourists.tourists.length > 0) {
      // Если есть обычные туристы, берем последнего
      const lastTourist = foundTourists.tourists[foundTourists.tourists.length - 1]
      finalTourist = {
        id: lastTourist.id,
        name: lastTourist.name,
        tel: lastTourist.tel,
        email: lastTourist.email,
        manager_id: lastTourist.manager_id,
        office_id: lastTourist.office_id,
      }
    } else if (foundTourists.temp_tourists.length > 0) {
      // Если есть только временные турист, конвертируем его в обычного
      const tempTourist = foundTourists.temp_tourists[foundTourists.temp_tourists.length - 1]
      finalTourist = await convertTempTourist(tempTourist)
    }
  }

  if (!finalTourist) {
    throw new Error('Не удалось создать туриста')
  }

  // Создаем обращение
  const addPreorderResponse = await createPreorder(finalTourist, deal)
  const preorderUrl = createPreorderLink(addPreorderResponse?.data.preorder_id || -1)

  // Обновляем сделку в Битрикс24
  await BitrixApi.updateDeal(dealId, {
    UF_CRM_1753433653919: preorderUrl,
  })
}

async function searchTourists(searchValue: string) {
  const [tourists, tempTourists] = await Promise.all([
    MoiDokumentiApi.getTourists({
      fields: ['id', 'name', 'tel', 'email', 'manager_id', 'office_id'],
      search: searchValue,
    }),
    MoiDokumentiApi.getTempTourists({
      fields: ['id', 'name', 'tel', 'email', 'manager_id', 'office_id'],
      search: searchValue,
    }),
  ])

  return {
    tourists: tourists.data,
    temp_tourists: tempTourists.data,
  }
}

async function createTourist(touristData: Partial<Tourist>) {
  const response = await MoiDokumentiApi.addTourist(touristData)

  return {
    id: response.data.tourist_id,
    name: touristData.name || '',
    tel: touristData.tel || '',
    email: touristData.email || '',
    manager_id: touristData.manager_id,
    office_id: touristData.office_id,
  }
}

async function convertTempTourist(tempTourist: TempTourist) {
  await MoiDokumentiApi.deleteTempTourist(tempTourist.id)

  return createTourist({
    name: tempTourist.name,
    tel: tempTourist.tel,
    email: tempTourist.email,
    manager_id: tempTourist.manager_id,
    office_id: tempTourist.office_id,
  })
}

async function createPreorder(tourist: TempTourist, deal: BitrixDeal) {
  const response = await MoiDokumentiApi.createPreorder({
    tourist_type: 'tourist',
    tourist_id: tourist.id,
    comment: formatPreorderComment(deal),
  })

  return response
}
