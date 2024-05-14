import type HttpServer from '@/infrastructure/http/HttpServer'
import AddAccountController from '@/presentation/controllers/account/AddAccountController'
import CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import { makeAddAccountValidation } from '@/presentation/validation/validators/account/AddAccountValidation'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import MailerGatewayConsole from '@/infrastructure/gateway/MailerGatewayConsole'
import { adaptRoute } from '@/main/adapters/express-route-adapter'

export default (httpServer: HttpServer): void => {
  const connection = new PgPromiseAdapter()
  const accountRepository = new DbAccountRepository(connection)
  const checkAccountByEmailUseCase = new CheckAccountByEmailUseCase(accountRepository)
  const mailerGateway = new MailerGatewayConsole()
  const addAccountUseCase = new AddAccountUseCase(accountRepository, mailerGateway)
  const addAccountValidation = makeAddAccountValidation()
  const addAccountController = new AddAccountController(checkAccountByEmailUseCase, addAccountUseCase, addAccountValidation)
  const route = adaptRoute(addAccountController)

  httpServer.register('post', '/account', route)
}
