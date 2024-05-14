import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import type AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'

export default class AddAccountController implements Controller {
  constructor (private readonly addAccountUseCase: AddAccountUseCase) {
  }

  async handle (request: AddAccountControllerDto.Input): Promise<HttpResponse> {
    try {
      const output: AddAccountUseCaseDto.Output = await this.addAccountUseCase.execute(this.createFromRequest(request))
      return {
        body: output,
        statusCode: 201
      }
    } catch (e) {
      console.log((e as Error).message, (e as Error).stack)
      return {
        body: [],
        statusCode: 201
      }
    }
  }

  private createFromRequest (request: AddAccountControllerDto.Input): AddAccountUseCaseDto.Input {
    return { ...request }
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
