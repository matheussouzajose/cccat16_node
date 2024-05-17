import { type Controller } from '@/presentation/controllers/protocols/Controller';
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse';
import BaseError from '@/domain/shared/error/BaseError';

export default class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      return await this.controller.handle(request);
    } catch (error: any) {
      if (!BaseError.isBaseError(error)) {
        console.error('Error occurred', error.message);
      }
      throw error;
    }
  }
}
