import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import { type NextFunction, type Request, type Response } from 'express'
import BaseError from '@/domain/shared/error/BaseError'
import InternalServerError from '@/main/error/InternalServerError'

export default (httpServer: HttpServer): void => {
  httpServer.addMiddleware((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(err)
      return
    }
    const error: BaseError = normalizeError(err)
    res.status(error.statusCode).send(error.output())
  })
}

function normalizeError (err: Error): BaseError {
  if (err instanceof BaseError) {
    return err
  }
  return InternalServerError.create(err.message)
}
