import BaseError from '@/domain/shared/error/BaseError'

export class NameError extends BaseError {
  private constructor (detail: string, statusCode: number = 422) {
    super({
      title: 'Invalid Name.',
      statusCode,
      detail
    })
  }

  static invalid (): NameError {
    return new NameError('Must have first and last name')
  }
}
