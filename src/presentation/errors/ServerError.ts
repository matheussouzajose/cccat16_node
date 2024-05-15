export class ServerError extends Error {
  constructor (stack?: string) {
    super(stack)
    this.name = 'ServerError'
    this.stack = stack
  }

  static internalError (value?: string): ServerError {
    return new ServerError(value)
  }
}
