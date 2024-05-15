import DomainError from '@/domain/account/error/DomainError'

export class CpfError extends DomainError {
  private constructor (message: string) {
    super(message)
    this.name = 'cpf'
    this.stack = message
  }

  static invalid (value: string): CpfError {
    return new CpfError(`The cpf ${value} is invalid.`)
  }
}
