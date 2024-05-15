import express, { Router } from 'express'
import type HttpServer from '@/infrastructure/http/protocols/HttpServer'

export default class ExpressServerAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express()
  }

  listen (port: number): void {
    this.app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
  }

  register (method: string, url: string, callback: Function, middlewares: Function[] = []): void {
    const router: any = Router()
    router[method](url, callback)
    this.app.use(router)
    // this.app[method](url, callback)
  }

  addMiddleware (callback: Function): void {
    this.app.use(callback)
  }
}
