import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import type AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import type CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import { created, serverError, unprocessable } from '@/presentation/helpers/http-helper'
import { type Validation } from '@/presentation/controllers/protocols/Validation'

export default class AddAccountController implements Controller {
  constructor (
    private readonly checkAccountByEmail: CheckAccountByEmailUseCase,
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly validation: Validation
  ) {
  }

  async handle (request: AddAccountControllerDto.Input): Promise<HttpResponse> {
    try {
      const error: Record<string, string[]> | undefined = this.validation.validate(request)
      if (error) {
        return unprocessable(error)
      }
      const emailExisting: boolean = await this.checkAccountByEmail.execute(request.email)
      if (emailExisting) {
        return unprocessable({ email: 'The email already exists.' })
      }
      const output: AddAccountUseCaseDto.Output = await this.addAccountUseCase.execute(this.createFromRequest(request))
      return created(output)
    } catch (e) {
      const error: Error = (e as Error)
      return serverError(error)
    }
  }

  private createFromRequest (request: AddAccountControllerDto.Input): AddAccountUseCaseDto.Input {
    return {
      name: request.name,
      email: request.email,
      cpf: request.cpf,
      isPassenger: request.is_passenger,
      carPlate: request.car_plate,
      isDriver: request.is_driver
    }
  }
}

export namespace AddAccountControllerDto {
  export type Input = {
    name: string
    email: string
    cpf: string
    is_passenger: boolean
    car_plate?: string
    is_driver?: boolean
  }
}
