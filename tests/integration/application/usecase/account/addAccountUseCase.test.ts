import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import AddAccountUseCase, { type AddAccountDto } from '@/application/usecase/account/AddAccountUseCase'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import { EmailError } from '@/domain/account/error/EmailError'
import { mockAccountPassenger } from '@/tests/mocks/MockAccount'
import MailerGatewayStub from '@/tests/stubs/MailerGatewayStub'

describe('Add Account UseCase', () => {
  let addAccountUseCase: AddAccountUseCase
  let mailerGateway: MailerGatewayStub

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    const accountRepository = new DbAccountRepository(pgPromiseAdapter)
    mailerGateway = new MailerGatewayStub()
    addAccountUseCase = new AddAccountUseCase(accountRepository, mailerGateway)
  })

  beforeEach(async (): Promise<void> => { await connectDbTesting() })

  afterEach(async (): Promise<void> => { await disconnectDbTesting() })

  test('Should be create an passenger account', async () => {
    const input: AddAccountDto.Input = mockAccountPassenger()
    const output: AddAccountDto.Output = await addAccountUseCase.execute(input)
    expect(mailerGateway.recipient).toBe(input.email)
    expect(output.accountId).toBeDefined()
  })

  test('Should throw if email already exist', async function (): Promise<void> {
    const input: AddAccountDto.Input = mockAccountPassenger()
    await addAccountUseCase.execute(input)
    await expect(async (): Promise<AddAccountDto.Output> => await addAccountUseCase.execute(input))
      .rejects.toThrow(EmailError.alreadyExists(input.email))
  })
})
