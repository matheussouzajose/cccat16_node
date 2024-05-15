import DomainError from '@/domain/account/error/DomainError'

export class AccountError extends DomainError {
  private constructor (message: string) {
    super(message)
    this.name = 'AccountError'
    this.stack = message
  }

  static notFound (value: string): AccountError {
    return new AccountError(`The account ${value} not found.`)
  }
}
