export class CpfError extends Error {
  private constructor (message: string) {
    super(message)
    this.name = 'CpfError'
  }

  static invalid (value: string): CpfError {
    return new CpfError(`The cpf ${value} is invalid.`)
  }
}
