import BaseError from '@/domain/shared/error/BaseError'

export class EmailError extends BaseError {
  private constructor (detail: string, statusCode: number = 422) {
    super({
      title: 'Invalid Email.',
      statusCode,
      detail
    })
  }

  static invalid (value: string): EmailError {
    return new EmailError(`The email ${value} is invalid.`)
  }

  static alreadyExists (): EmailError {
    return new EmailError('The email already exists.')
  }
}
