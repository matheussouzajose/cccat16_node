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

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UN_PROCESSABLE = 422,
  INTERNAL_SERVER = 500,
}
