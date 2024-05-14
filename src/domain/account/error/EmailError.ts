export class EmailError extends Error {
  private constructor (message: string) {
    super(message)
    // this.name = 'EmailError'
  }

  static invalid (value: string): EmailError {
    return new EmailError(`The email ${value} is invalid.`)
  }

  static alreadyExists (value: string): EmailError {
    return new EmailError(`The email ${value} already exists.`)
  }
}
