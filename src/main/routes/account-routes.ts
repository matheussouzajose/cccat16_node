import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import ExpressRouteAdapter from '@/main/adapters/express/ExpressRouteAdapter'
import { makeAddAccountController } from '@/main/factories/controllers/account/add-account-controller-factory'
import { makeGetAccountController } from '@/main/factories/controllers/account/get-account-controller-factory'

export default (httpServer: HttpServer): void => {
  httpServer.register(
    'post',
    '/account',
    ExpressRouteAdapter.adaptRoute(makeAddAccountController()),
    []
  )

  httpServer.register(
    'get',
    '/account/:id',
    ExpressRouteAdapter.adaptRoute(makeGetAccountController()),
    []
  )
}
