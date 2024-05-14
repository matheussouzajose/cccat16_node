import type HttpServer from '@/infrastructure/http/HttpServer'
import express, { json, type Request, type Response, type NextFunction } from 'express'

export default class ExpressServerAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express()
    this.setupMiddleware()
  }

  listen (port: number): void {
    this.app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
  }

  register (method: string, url: string, callback: Function): void {
    this.app[method](url, callback)
  }

  private setupMiddleware (): void {
    this.bodyParser()
    this.contentType()
    this.cors()
    this.noCache()
  }

  private bodyParser (): void {
    this.app.use(json())
  }

  private contentType (): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.type('json')
      next()
    })
  }

  private cors (): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.set('access-control-allow-origin', '*')
      res.set('access-control-allow-headers', '*')
      res.set('access-control-allow-methods', '*')
      next()
    })
  }

  private noCache (): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      res.set('pragma', 'no-cache')
      res.set('expires', '0')
      res.set('surrogate-control', 'no-store')
      next()
    })
  }
}
