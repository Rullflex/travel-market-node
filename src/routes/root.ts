import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import type { TourData, TourFullPaymentOperatorData } from './types.js'
import { handleFinalInvoice, tourConfirm, tourFullPaymentOperator } from '@/usecases/index.js'

const routes: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _opts): Promise<void> => {
  fastify.get('/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
      },
    } as const,
  }, async (_request, _reply) => {
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

  fastify.post('/tour-full-payment-operator', async (req) => {
    await tourFullPaymentOperator(req.body as TourFullPaymentOperatorData)
  })

  fastify.post('/tour-confirm', async (req) => {
    await tourConfirm(req.body as TourData)
  })
}

export default routes
