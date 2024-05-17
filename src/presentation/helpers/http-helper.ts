import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import {ValidationDto} from "@/presentation/controllers/protocols/Validation";

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

export const badRequest = (error: object): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const notFound = (error: object): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const unprocessable = (error: object): HttpResponse => ({
  statusCode: 422,
  body: error
})

export const unprocessableRequest = (errors: ValidationDto.Output[]): HttpResponse => ({
  statusCode: 422,
  body: {
    title: 'Your request is not valid.',
    errors
  }
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
