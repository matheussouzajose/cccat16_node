import BaseError from '@/domain/shared/error/BaseError'

export class UuidError extends BaseError {
  private constructor (detail: string, statusCode: number = 422) {
    super({
      title: 'Invalid Uuid.',
      statusCode,
      detail
    })
  }

  static invalid (value: string): UuidError {
    return new UuidError(`The uuid ${value} is invalid.`)
  }
}
