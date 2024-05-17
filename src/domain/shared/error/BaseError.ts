export default abstract class BaseError extends Error {
  public statusCode: number
  public detail?: string
  public type?: string
  public extensions?: any

  protected constructor (input: BaseDto.Input) {
    super(input.title)
    Object.setPrototypeOf(this, new.target.prototype)
    this.statusCode = input.statusCode
    this.detail = input.detail
    this.type = input.type
    this.extensions = input.extensions
    Error.captureStackTrace(this)
  }

  static isBaseError (error: Error): boolean {
    return error instanceof BaseError
  }

  abstract output (): any
}

export namespace BaseDto {
  export type Input = {
    title: string
    statusCode: number
    detail?: string
    type?: string
    extensions?: any
  }
}
