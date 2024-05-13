import { CarPlateError } from '@/domain/account/error/CarPlateError'

export default class CarPlate {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValid(value)
    this.value = value
  }

  private ensureIsValid (value: string): void {
    if ((value !== '') && (value.match(/[A-Z]{3}[0-9]{4}/) === null)) {
      throw CarPlateError.invalid(value)
    }
  }
}
