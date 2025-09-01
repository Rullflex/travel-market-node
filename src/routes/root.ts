import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import type { BitrixDealEvent, TourFullPaymentData } from './types.js'
import { tourFullPayment } from '@/usecases/index.js'

const routes: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    }
  })

  fastify.post('/final-invoice', async (req, reply) => {
    const { body } = req as { body: BitrixDealEvent }

    req.log.debug(body)

    if (!body) {
      return reply.badRequest('Body is empty')
    }

    if (body.auth.application_token !== process.env.BITRIX_APPLICATION_TOKEN) {
      return reply.badRequest('Application token is invalid')
    }

    if (body.event !== 'ONCRMDEALMOVETOCATEGORY') {
      return reply.badRequest('Event is not ONCRMDEALMOVETOCATEGORY')
    }

    if (body.data.FIELDS.STAGE_ID !== 'FINAL_INVOICE') {
      return reply.badRequest('Stage is not FINAL_INVOICE')
    }

    try {
      // return await handleFinalInvoice(body.data.FIELDS.ID)
    } catch (err) {
      const { message } = err as Error
      req.log.error(body, message)
      return reply.badRequest(message)
    }
  })

  fastify.post('/tour-full-payment', async (req, reply) => {
    const { body } = req as { body: TourFullPaymentData }

    if (!body) {
      return reply.badRequest('Body is empty')
    }

    try {
      return await tourFullPayment(body)
    } catch (err) {
      const { message } = err as Error
      req.log.error(body, message)
      return reply.badRequest(message)
    }
  })
}

export default routes
