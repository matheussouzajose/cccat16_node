export class AccountError extends Error {
  private constructor (message: string) {
    super(message)
    this.name = 'AccountError'
  }

  static notFound (value: string): AccountError {
    return new AccountError(`The account ${value} not found.`)
  }
}
