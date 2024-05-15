import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import type DatabaseConnection from '@/infrastructure/database/DatabaseConnection'
import setupRoutes from '@/main/config/routes'

export default class App {
  constructor (private readonly httpServer: HttpServer, private readonly databaseConnection: DatabaseConnection) {
    setupRoutes(this.httpServer)
    this.databaseConnection.connect()
  }
}
