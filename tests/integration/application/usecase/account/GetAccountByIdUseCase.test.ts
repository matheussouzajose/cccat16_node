import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import GetAccountByIdUseCase, { type GetAccountById } from '@/application/usecase/account/GetAccountByIdUseCase'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import { AccountError } from '@/domain/account/error/AccountError'
import AddAccountUseCase, { type AddAccountDto } from '@/application/usecase/account/AddAccountUseCase'
import MailerGatewayStub from '@/tests/stubs/MailerGatewayStub'
import { mockAccountPassenger } from '@/tests/mocks/MockAccount'
import * as faker from 'faker'

describe('Get Account UseCase', () => {
  let getAccountUseCase: GetAccountByIdUseCase
  let addAccountUseCase: AddAccountUseCase

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    const accountRepository = new DbAccountRepository(pgPromiseAdapter)
    getAccountUseCase = new GetAccountByIdUseCase(accountRepository)
    addAccountUseCase = new AddAccountUseCase(accountRepository, new MailerGatewayStub())
  })

  beforeEach(async (): Promise<void> => {
    await connectDbTesting()
  })

  afterEach(async (): Promise<void> => {
    await disconnectDbTesting()
  })

  test('Should throw if account no exist', async function (): Promise<void> {
    const accountId: string = faker.datatype.uuid()
    await expect(async () => {
      await getAccountUseCase.execute(accountId)
    })
      .rejects.toThrow(AccountError.notFound(accountId))
  })

  test('Should return account', async function (): Promise<void> {
    const input: AddAccountDto.Input = mockAccountPassenger()
    const { accountId } = await addAccountUseCase.execute(input)
    const output: GetAccountById.Output = await getAccountUseCase.execute(accountId)
    expect(output.accountId).toBe(accountId)
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.cpf).toBe(input.cpf)
    expect(output.isPassenger).toBe(input.isPassenger)
    expect(output.carPlate).toBe('')
    expect(output.isDriver).toBeFalsy()
  })
})
