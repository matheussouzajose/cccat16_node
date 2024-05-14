import ExpressServerAdapter from '@/infrastructure/http/adapters/ExpressServerAdapter'
import App from '@/main/config/App'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const httpServer = new ExpressServerAdapter()
const pgPromiseAdapter = new PgPromiseAdapter()
new App(httpServer, pgPromiseAdapter)
httpServer.listen(3000)
