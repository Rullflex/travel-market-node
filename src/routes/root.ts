import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import type { TourFullPaymentData } from './types.js'
import { handleFinalInvoice, tourFullPayment } from '@/usecases/index.js'

const routes: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _opts): Promise<void> => {
  fastify.get('/health', async () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    }
  })

  fastify.get('/final-invoice', {
    schema: {
      querystring: {
        type: 'object',
        required: ['deal_id'],
        properties: {
          deal_id: { type: 'string' },
          deal_name: { type: 'string' },
          deal_type: { type: 'string' },

          phone: { type: 'string' },
          email: { type: 'string', format: 'email' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },

          tour_format: { type: 'string' },
          tour_start_date: { type: 'string' },
          tour_end_date: { type: 'string' },
          tour_price: { type: 'string' },
        },
      } as const,
    },
  }, async (request, _reply) => {
    return await handleFinalInvoice(request.query)
  })

  fastify.post('/tour-full-payment', async (req, reply) => {
    const { body } = req as { body: TourFullPaymentData }
    const logger = req.log.child({}, { msgPrefix: '[tour-full-payment] ' })
    logger.info({ body })

    if (!body) {
      return reply.badRequest('Body is empty')
    }

    try {
      const result = await tourFullPayment(body)
      return reply.send(result)
    } catch (err) {
      const { message } = err as Error
      logger.error(message)
      return reply.badRequest(message)
    }
  })
}

export default routes
