import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import type AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import type CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import { type Validation } from '@/presentation/controllers/protocols/Validation'
import { created } from '@/presentation/helpers/http-helper'
import { EmailError } from '@/domain/account/error/EmailError'

export default class AddAccountController implements Controller {
  constructor (
    private readonly checkAccountByEmail: CheckAccountByEmailUseCase,
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly validation: Validation
  ) {
  }

  async handle (request: AddAccountControllerDto.Input): Promise<HttpResponse> {
    this.validation.validate(request)
    await this.checkEmail(request.email)
    const output: AddAccountUseCaseDto.Output = await this.addAccountUseCase.execute(this.createFromRequest(request))
    return created(output)
  }

  private async checkEmail (email: string): Promise<void> {
    if (await this.checkAccountByEmail.execute(email)) {
      throw EmailError.alreadyExists()
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
