import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import { handleFinalInvoice } from '@/usecases'

const routes: FastifyPluginAsyncJsonSchemaToTs = async (fastify, _opts): Promise<void> => {
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
}

export default routes
