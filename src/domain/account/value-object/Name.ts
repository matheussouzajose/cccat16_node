import { NameError } from '@/domain/account/error/NameError'

export default class Name {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValid(value)
    this.value = value
  }

  private ensureIsValid (value: string): void {
    const isValid = value.match(/[a-zA-Z] [a-zA-Z]+/)
    if (isValid === null) {
      throw NameError.invalid(value)
    }
  }
}
