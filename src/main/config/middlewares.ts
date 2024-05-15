import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import { json, type NextFunction, type Request, type Response } from 'express'

export default (httpServer: HttpServer): void => {
  httpServer.addMiddleware(json())
  httpServer.addMiddleware((req: Request, res: Response, next: NextFunction): void => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    res.set('access-control-allow-methods', '*')
    next()
  })
  httpServer.addMiddleware((req: Request, res: Response, next: NextFunction): void => {
    res.type('json')
    next()
  })
  httpServer.addMiddleware((req: Request, res: Response, next: NextFunction): void => {
    res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.set('pragma', 'no-cache')
    res.set('expires', '0')
    res.set('surrogate-control', 'no-store')
    next()
  })
}
