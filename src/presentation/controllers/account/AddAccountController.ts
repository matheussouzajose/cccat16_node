import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import type AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import type CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import { created, serverError, unprocessable } from '@/presentation/helpers/http-helper'
import { EmailError } from '@/domain/account/error/EmailError'

export default class AddAccountController implements Controller {
  constructor (
    private readonly checkAccountByEmail: CheckAccountByEmailUseCase,
    private readonly addAccountUseCase: AddAccountUseCase
  ) {
  }

  async handle (request: AddAccountControllerDto.Input): Promise<HttpResponse> {
    try {
      const emailExisting: boolean = await this.checkAccountByEmail.execute(request.email)
      if (emailExisting) {
        return unprocessable(EmailError.alreadyExists(request.email))
      }
      const output: AddAccountUseCaseDto.Output = await this.addAccountUseCase.execute({ ...request })
      return created(output)
    } catch (e) {
      const error: Error = (e as Error)
      return serverError(error)
    }
  }
}

export namespace AddAccountControllerDto {
  export type Input = {
    name: string
    email: string
    cpf: string
    isPassenger: boolean
    carPlate?: string
    isDriver?: boolean
  }
}
