import express from 'express'
import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import { bodyParser } from '@/infrastructure/http/middlewares/express/body-parser'
import { cors } from '@/infrastructure/http/middlewares/express/cors'
import { contentType } from '@/infrastructure/http/middlewares/express/content-type'
import { noCache } from '@/infrastructure/http/middlewares/express/no-cache'

export default class ExpressServerAdapter implements HttpServer {
  app: any

  constructor () {
    this.app = express()
    this.app.use(bodyParser)
    this.app.use(cors)
    this.app.use(contentType)
    this.app.use(noCache)
  }

  listen (port: number): void {
    this.app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
  }

  register (method: string, url: string, callback: Function): void {
    this.app[method](url, callback)
  }
}
