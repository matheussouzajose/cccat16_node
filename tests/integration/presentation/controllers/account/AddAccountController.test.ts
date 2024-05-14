import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import AddAccountController, { type AddAccountControllerDto } from '@/presentation/controllers/account/AddAccountController'
import AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import MailerGatewayConsole from '@/infrastructure/gateway/MailerGatewayConsole'

describe('Add Account Controller', () => {
  let addAccountController: AddAccountController
  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    const accountRepository = new DbAccountRepository(pgPromiseAdapter)
    const mailerGatewayConsole = new MailerGatewayConsole()
    const addAccountUseCase = new AddAccountUseCase(accountRepository, mailerGatewayConsole)
    addAccountController = new AddAccountController(addAccountUseCase)
  })

  beforeEach(async (): Promise<void> => { await connectDbTesting() })

  afterEach(async (): Promise<void> => { await disconnectDbTesting() })

  test('Should create an passenger account', async () => {
    const input: AddAccountControllerDto.Input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '87748248800',
      isPassenger: true
    }
    await addAccountController.handle(input)
    const output = await addAccountController.handle(input)
    console.log({ output })
  })
})
