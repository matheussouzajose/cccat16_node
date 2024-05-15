import 'module-alias/register'
import ExpressServerAdapter from '@/infrastructure/http/adapters/express/ExpressServerAdapter'
import App from '@/main/config/App'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') })
const httpServer = new ExpressServerAdapter()
const pgPromiseAdapter = new PgPromiseAdapter()
new App(httpServer, pgPromiseAdapter)
httpServer.listen(3000)
