import CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import { makeDbAccountRepository } from '@/main/factories/repositories/account/account-repository-factory'

export const makeCheckAccountByEmailUseCase = (): CheckAccountByEmailUseCase => {
  return new CheckAccountByEmailUseCase(makeDbAccountRepository())
}
