import type { FastifyFormbodyOptions } from '@fastify/formbody'
import formbody from '@fastify/formbody'
import fp from 'fastify-plugin'

/**
 * This plugins enables the use of CORS in a Fastify application
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyFormbodyOptions>(async (fastify) => {
  fastify.register(formbody)
})
