import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import type { TourFullPaymentData } from './types.js'
import { handleFinalInvoice, tourFullPayment } from '@/usecases/index.js'

const routes: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    }
  })

  fastify.post('/final-invoice', async (request, reply) => {
    try {
      request.log.info(request.body)
      // return await handleFinalInvoice(request.body)
    } catch (err) {
      const { message } = err as Error
      request.log.error(request.query, message)
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
