import { Service } from 'typedi'
import { Context } from 'graphql-yoga/dist/types'
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { Request } from 'request'
import { IncomingMessage } from 'http'

@Service()
export class TestMiddleware implements MiddlewareInterface<Context> {
  async use ({ root, args, context, info }: ResolverData<Context>, next: NextFn) {
    const httpRequest = context.request.request as IncomingMessage

    if (httpRequest.headers['x-tabt-username'] && httpRequest.headers['x-tabt-password']) {
      context.username = httpRequest.headers['x-tabt-username']
      context.password = httpRequest.headers['x-tabt-password']
    }

    if (httpRequest.headers['x-tabt-database']) {
      context.database = httpRequest.headers['x-tabt-database']
    }
    return next()
  }
}
