import { NameError } from '@/domain/account/error/NameError'

export default class Name {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValid(value)
    this.value = value
  }

  private ensureIsValid (value: string): void {
    if (value.match(/[a-zA-Z] [a-zA-Z]+/) === null) {
      throw NameError.invalid()
    }
  }
}
