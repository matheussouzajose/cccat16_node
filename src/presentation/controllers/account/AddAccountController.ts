import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import type AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import { type Validation } from '@/presentation/controllers/protocols/Validation'
import { created, unprocessableRequest } from '@/presentation/helpers/http-helper'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'

@LogControllerDecorator
export default class AddAccountController implements Controller {
  constructor (
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly validation: Validation
  ) {
  }

  async handle (request: AddAccountControllerDto.Input): Promise<HttpResponse> {
    const errors = this.validation.validate(request)
    if (errors) {
      return unprocessableRequest(errors)
    }
    const output: AddAccountUseCaseDto.Output = await this.addAccountUseCase.execute(this.createFromRequest(request))
    return created(output)
  }

  private createFromRequest (request: any): AddAccountUseCaseDto.Input {
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
