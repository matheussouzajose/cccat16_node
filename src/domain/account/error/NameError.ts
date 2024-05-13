export class NameError extends Error {
  private constructor (message: string) {
    super(message)
    this.name = 'NameError'
  }

  static invalid (value: string): NameError {
    return new NameError(`The name ${value} is invalid.`)
  }
}
