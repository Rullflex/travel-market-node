import type { TempTourist, Tourist } from '@/api/travel-market'
import type { DealData } from '@/types'
import { BitrixApi } from '@/api/bitrix'
import { MoiDokumentiApi } from '@/api/travel-market'
import { createPreorderLink, formatPreorderComment } from '@/utils'

const data: DealData = {
  // тестовые данные
  deal_id: '1',
  phone: '+79001234567',
  email: 'test@example.com',
}

async function main() {
  // TODO: Здесь должна быть логика получения data из запроса

  let foundTourists: {
    tourists: Awaited<ReturnType<typeof searchTourists>>['tourists']
    temp_tourists: Awaited<ReturnType<typeof searchTourists>>['temp_tourists']
  } = { tourists: [], temp_tourists: [] }

  // Поиск по телефону
  if (data.phone) {
    foundTourists = await searchTourists(data.phone)
  }

  // Если не найдено по телефону и есть email — ищем по email
  if (foundTourists.tourists.length === 0
    && foundTourists.temp_tourists.length === 0
    && data.email) {
    foundTourists = await searchTourists(data.email)
  }

  let finalTourist: Awaited<ReturnType<typeof createTourist>> | null = null

  // Если никого не нашли - создаем нового туриста
  if (foundTourists.tourists.length === 0 && foundTourists.temp_tourists.length === 0) {
    const fullName = [data.last_name, data.first_name].filter(Boolean).join(' ').trim()

    finalTourist = await createTourist({
      name: fullName || 'Неизвестный турист',
      tel: data.phone || '',
      email: data.email || '',
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

  if (finalTourist) {
    // Создаем обращение
    const addPreorderResponse = await createPreorder(finalTourist, data)
    const preorderUrl = createPreorderLink(addPreorderResponse?.data.preorder_id || -1)

    // Обновляем сделку в Битрикс24
    const updateDealResponse = await BitrixApi.updateDeal(Number.parseInt(data.deal_id), {
      UF_CRM_1753433653919: preorderUrl,
    })

    console.warn({
      input: data,
      tourist: finalTourist,
      add_preorder_response: addPreorderResponse,
      preorder_url: preorderUrl,
      update_deal_response: updateDealResponse,
      found_tourists: foundTourists,
    })
  } else {
    console.error('Не удалось создать или найти туриста', data)
  }
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

async function createPreorder(tourist: TempTourist, data: DealData) {
  const preorderName = `${data.deal_name ?? 'Без названия сделки'}: ПОДГОТОВКА ДОКУМЕНТОВ ИЗ БИТРИКСА`

  const response = await MoiDokumentiApi.createPreorder({
    tourist_type: 'tourist',
    tourist_id: tourist.id,
    comment: formatPreorderComment(data, preorderName),
  })

  return response
}

main()
