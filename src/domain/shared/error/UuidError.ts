export class UuidError extends Error {
  private constructor (message: string) {
    super(message)
    this.name = 'UuidError'
  }

  static invalid (value: string): UuidError {
    return new UuidError(`The uuid ${value} is invalid.`)
  }
}
