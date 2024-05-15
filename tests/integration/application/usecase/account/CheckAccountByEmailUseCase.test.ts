import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import AddAccountUseCase, { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
import MailerGatewayStub from '@/tests/stubs/MailerGatewayStub'
import { mockAccountPassenger } from '@/tests/mocks/MockAccount'
import CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'

describe('Check Account By Email', () => {
  let checkAccountByEmailUseCase: CheckAccountByEmailUseCase
  let addAccountUseCase: AddAccountUseCase

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    const accountRepository = new DbAccountRepository(pgPromiseAdapter)
    checkAccountByEmailUseCase = new CheckAccountByEmailUseCase(accountRepository)
    addAccountUseCase = new AddAccountUseCase(accountRepository, new MailerGatewayStub())
  })

  beforeEach(async (): Promise<void> => {
    await connectDbTesting()
  })

  afterEach(async (): Promise<void> => {
    await disconnectDbTesting()
  })

  test('Should return false when email no exists', async function (): Promise<void> {
    const output: boolean = await checkAccountByEmailUseCase.execute('jonh.doe@email.com')
    expect(output).toBeFalsy()
  })

  test('Should return account', async function (): Promise<void> {
    const input: AddAccountUseCaseDto.Input = mockAccountPassenger()
    await addAccountUseCase.execute(input)
    const output: boolean = await checkAccountByEmailUseCase.execute(input.email)
    expect(output).toBeTruthy()
  })
})
