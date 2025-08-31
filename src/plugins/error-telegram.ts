import axios from 'axios'
import fp from 'fastify-plugin'
import { NOTIFICATIONS_BOT_TOKEN, NOTIFICATIONS_CHAT_ID } from '@/const/index.js'

export default fp(async (fastify) => {
  fastify.addHook('onError', async (request, reply, error) => {
    try {
      axios.post(`https://api.telegram.org/bot${NOTIFICATIONS_BOT_TOKEN}/sendMessage`, {
        chat_id: NOTIFICATIONS_CHAT_ID,
        text: `🔥 Ошибка интеграции: ${request.url}\n\n${error.stack}`,
      })
    } catch (err) {
      request.log.error({ err }, 'Не удалось отправить лог в Telegram')
    }
  })
})
