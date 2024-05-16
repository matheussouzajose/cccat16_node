import BaseError from '@/domain/shared/error/BaseError';

export class CpfError extends BaseError {
  private constructor (detail: string, statusCode: number = 422) {
    super({
      title: 'Invalid Cpf.',
      statusCode,
      detail
    })
  }

  static invalid (value: string): CpfError {
    return new CpfError(`The cpf ${value} is invalid.`)
  }

  output (): any {
    return {
      title: this.message,
      detail: this.detail
    }
  }
}
