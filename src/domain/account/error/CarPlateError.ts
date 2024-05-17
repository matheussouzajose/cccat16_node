import BaseError from '@/domain/shared/error/BaseError'

export class CarPlateError extends BaseError {
  private constructor (detail: string, statusCode: number = 422) {
    super({
      title: 'Invalid Car Plate.',
      statusCode,
      detail
    })
  }

  static invalid (value: string): CarPlateError {
    return new CarPlateError(`The car plate ${value} is invalid.`)
  }
}
