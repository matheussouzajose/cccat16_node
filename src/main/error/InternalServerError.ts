import BaseError from '@/domain/shared/error/BaseError'

export default class InternalServerError extends BaseError {
  private constructor (detail: string) {
    super({
      title: 'An error occurred on server',
      statusCode: 500,
      detail
    })
  }

  static create (detail: string): InternalServerError {
    return new InternalServerError(detail)
  }

  output (): any {
    return {
      title: this.message,
      detail: this.detail
    }
  }
}
