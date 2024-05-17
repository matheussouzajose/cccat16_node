import { v4 as valueV4, validate } from 'uuid'
import { UuidError } from '@/domain/shared/error/UuidError'

export default class Uuid {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValid(value)
    this.value = value
  }

  private ensureIsValid (value: string): void {
    const isValid: boolean = validate(value)
    if (!isValid) {
      throw UuidError.invalid(value)
    }
  }

  static random (): Uuid {
    return new Uuid(valueV4())
  }
}
