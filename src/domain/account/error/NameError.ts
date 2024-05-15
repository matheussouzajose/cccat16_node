import DomainError from '@/domain/account/error/DomainError'

export class NameError extends DomainError {
  private constructor (message: string) {
    super(message)
    this.name = 'name'
    this.stack = message
  }

  static invalid (value: string): NameError {
    return new NameError(`The name ${value} is invalid. Name should be compost.`)
  }
}
