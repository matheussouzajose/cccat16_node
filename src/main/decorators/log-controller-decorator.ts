import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import BaseError from '@/domain/shared/error/BaseError'

type Constructable = new (...args: any[]) => any

export default function LogControllerDecorator<T extends Constructable> (constructor: T): any {
  return class extends constructor {
    async handle (request: any): Promise<HttpResponse> {
      try {
        return await super.handle(request)
      } catch (error: any) {
        if (!BaseError.isBaseError(error)) {
          console.error('Error occurred', error.message)
        }
        throw error
      }
    }
  }
}
