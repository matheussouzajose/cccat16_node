import { EmailError } from '@/domain/account/error/EmailError'

export default class Email {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValid(value)
    this.value = value
  }

  private ensureIsValid (value: string): void {
    if (value.match(/^(.+)@(.+)$/) === null) {
      throw EmailError.invalid(value)
    }
  }
}
