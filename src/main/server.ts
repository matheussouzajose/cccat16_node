import 'module-alias/register'
import ExpressServerAdapter from '@/infrastructure/http/adapters/ExpressServerAdapter'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import setupApp from '@/main/config/app'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') })
const httpServer = new ExpressServerAdapter()
const pgPromiseAdapter = new PgPromiseAdapter()
setupApp(httpServer, pgPromiseAdapter)
httpServer.listen(3000)
