import { type Controller } from '@/presentation/controllers/protocols/Controller'
import AddAccountController from '@/presentation/controllers/account/AddAccountController'
import { makeCheckAccountByEmailUseCase } from '@/main/factories/usecases/account/check-account-by-email-usecase-factory'
import { makeAddAccountUseCase } from '@/main/factories/usecases/account/add-account-usecase-factory'
import { makeAddAccountValidation } from '@/main/factories/validators/account/add-account-validation-factory'

export const makeAddAccountController = (): Controller => {
  return new AddAccountController(makeCheckAccountByEmailUseCase(), makeAddAccountUseCase(), makeAddAccountValidation())
}
