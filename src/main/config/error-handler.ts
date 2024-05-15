import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import type { NextFunction, Request, Response } from 'express'

export default (httpServer: HttpServer): void => {
  httpServer.addMiddleware((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('opa', { err })
  })
}
