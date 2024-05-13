export class CarPlateError extends Error {
  private constructor (message: string) {
    super(message)
    this.name = 'CarPlateError'
  }

  static invalid (value: string): CarPlateError {
    return new CarPlateError(`The car plate ${value} is invalid.`)
  }
}
