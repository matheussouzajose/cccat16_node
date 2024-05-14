import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { ServerError } from '@/presentation/errors/ServerError'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unprocessable = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
//
// export const unauthorized = (): HttpResponse => ({
//   statusCode: 401,
//   body: new UnauthorizedError()
// })
//
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})