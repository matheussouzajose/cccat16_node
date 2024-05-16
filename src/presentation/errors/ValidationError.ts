import BaseError, { type BaseDto } from '@/domain/shared/error/BaseError'
import { type ValidationDto } from '@/presentation/controllers/protocols/Validation'

export default class ValidationError extends BaseError {
  private constructor (input: BaseDto.Input) {
    super(input)
  }

  static create (extensions: ValidationDto.Output[]): ValidationError {
    return new ValidationError({
      title: 'Your request is not valid.',
      statusCode: 422,
      extensions
    })
  }

  output (): any {
    return {
      title: this.message,
      detail: this.detail,
      errors: this.extensions
    }
  }
}
