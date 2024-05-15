import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import { readdirSync } from 'fs'
import { join } from 'path'

export default (httpServer: HttpServer): void => {
  readdirSync(join(__dirname, '../routes')).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(httpServer)
    }
  })
}
