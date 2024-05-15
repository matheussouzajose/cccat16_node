import { makeDbAccountRepository } from '@/main/factories/repositories/account/account-repository-factory'
import AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import MailerGatewayConsole from '@/infrastructure/gateway/MailerGatewayConsole'

export const makeAddAccountUseCase = (): AddAccountUseCase => {
  return new AddAccountUseCase(makeDbAccountRepository(), new MailerGatewayConsole())
}
