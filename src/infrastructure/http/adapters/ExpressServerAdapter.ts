import express, { json, type NextFunction, type Request, type Response } from 'express'
import type HttpServer from '@/infrastructure/http/protocols/HttpServer'

export default class ExpressServerAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express()
    this.bodyParser()
    this.cors()
    this.contentType()
    this.noCache()
  }

  listen (port: number): void {
    this.app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
  }

  register (method: string, url: string, callback: Function): void {
    this.app[method](url, callback)
  }

  bodyParser (): void {
    this.app.use(json())
  }

  cors (): void {
    this.app.use((req: Request, res: Response, next: NextFunction): void => {
      res.set('access-control-allow-origin', '*')
      res.set('access-control-allow-headers', '*')
      res.set('access-control-allow-methods', '*')
      next()
    })
  }

  contentType (): void {
    this.app.use((req: Request, res: Response, next: NextFunction): void => {
      res.type('json')
      next()
    })
  }

  noCache (): void {
    this.app.use((req: Request, res: Response, next: NextFunction): void => {
      res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      res.set('pragma', 'no-cache')
      res.set('expires', '0')
      res.set('surrogate-control', 'no-store')
      next()
    })
  }
}
