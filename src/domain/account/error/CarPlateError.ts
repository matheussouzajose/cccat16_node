import DomainError from '@/domain/account/error/DomainError'

export class CarPlateError extends DomainError {
  private constructor (message: string) {
    super(message)
    this.name = 'carPlate'
    this.stack = message
  }

  static invalid (value: string): CarPlateError {
    return new CarPlateError(`The car plate ${value} is invalid.`)
  }
}
