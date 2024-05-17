import { type Controller } from '@/presentation/controllers/protocols/Controller'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { notFound, ok, unprocessableRequest } from '@/presentation/helpers/http-helper'
import LogControllerDecorator from '@/main/decorators/log-controller-decorator'
import type GetAccountByIdUseCase from '@/application/usecase/account/GetAccountByIdUseCase'
import { type Validation } from '@/presentation/controllers/protocols/Validation'

@LogControllerDecorator
export default class GetAccountController implements Controller {
  constructor (
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase,
    private readonly validation: Validation
  ) {
  }

  async handle (request: GetAccountControllerDto.Input): Promise<HttpResponse> {
    const errors = this.validation.validate(request)
    if (errors) {
      return unprocessableRequest(errors)
    }
    const output = await this.getAccountByIdUseCase.execute(request.id)
    if (!output) {
      return notFound({ title: 'Not Found', detail: 'The account not found.' })
    }
    return ok(output)
  }
}

export namespace GetAccountControllerDto {
  export type Input = {
    id: string
  }
}
