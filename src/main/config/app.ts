import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import type DatabaseConnection from '@/infrastructure/database/DatabaseConnection'
import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import setupErrorHandler from '@/main/config/error-handler'

export default (httpServer: HttpServer, databaseConnection: DatabaseConnection): void => {
  databaseConnection.connect()
  setupMiddlewares(httpServer)
  setupRoutes(httpServer)
  setupErrorHandler(httpServer)
}
