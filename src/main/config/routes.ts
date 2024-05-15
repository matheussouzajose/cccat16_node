import type HttpServer from '@/infrastructure/http/protocols/HttpServer'
import accountRoutes from '@/main/routes/account-routes'

export default function (httpServer: HttpServer): void {
  // readdirSync(join(__dirname, '../routes')).map(async file => {
  //   if (!file.endsWith('.map')) {
  //     (await import(`../routes/${file}`)).default(httpServer)
  //   }
  // })
  accountRoutes(httpServer)
}
