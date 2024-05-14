import type HttpServer from '@/infrastructure/http/HttpServer'
import { readdirSync } from 'fs'
import { join } from 'path'
import type DatabaseConnection from '@/infrastructure/database/DatabaseConnection'

export default class App {
  constructor (private readonly httpServer: HttpServer, private readonly databaseConnection: DatabaseConnection) {
    this.setupRoutes()
    databaseConnection.connect()
  }

  private setupRoutes (): void {
    readdirSync(join(__dirname, '../routes')).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(this.httpServer)
      }
    })
  }
}
