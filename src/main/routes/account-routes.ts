import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import ExpressRouteAdapter from '@/infrastructure/http/adapters/express/ExpressRouteAdapter'
import { makeAddAccountController } from '@/main/factories/controllers/account/add-account-controller-factory'

export default (httpServer: HttpServer): void => {
  httpServer.register('post', '/account', ExpressRouteAdapter.adaptRoute(makeAddAccountController()))
}
