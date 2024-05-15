import DomainError from '@/domain/account/error/DomainError'

export class EmailError extends DomainError {
  private constructor (message: string) {
    super(message)
    this.name = 'email'
    this.stack = message
  }

  static invalid (value: string): EmailError {
    return new EmailError(`The email ${value} is invalid.`)
  }
}
