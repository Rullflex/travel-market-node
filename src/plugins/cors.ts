import type { FastifySensibleOptions } from '@fastify/sensible'
import cors from '@fastify/cors'
import fp from 'fastify-plugin'

/**
 * This plugins enables the use of CORS in a Fastify application
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifySensibleOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: true,
  })
})
