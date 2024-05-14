export class ServerError extends Error {
  constructor (stack?: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }

  static internalError (value?: string): ServerError {
    return new ServerError(value)
  }
}
