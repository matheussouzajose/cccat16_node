import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import type AccountRepository from '@/domain/account/repository/AccountRepository'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import type Account from '@/domain/account/entity/Account'
import { mockAccount } from '@/tests/mocks/MockAccount'
import * as faker from 'faker'

describe('Db Account Repository', () => {
  let dbAccountRepository: AccountRepository
  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    dbAccountRepository = new DbAccountRepository(pgPromiseAdapter)
  })

  beforeEach(async (): Promise<void> => { void connectDbTesting() })

  afterEach(async (): Promise<void> => { await disconnectDbTesting() })

  test('Should return null when getAccountByEmail returns null', async () => {
    const output: Account | null = await dbAccountRepository.getAccountByEmail('john.doe@email.com')
    expect(output).toBeNull()
  })

  test('Should return account by email', async () => {
    const account: Account = mockAccount()
    await dbAccountRepository.saveAccount(account)
    const output: Account | null = await dbAccountRepository.getAccountByEmail(account.getEmail())
    expect(output?.getAccountId()).toBe(account.getAccountId())
    expect(output?.getName()).toBe(account.getName())
    expect(output?.getEmail()).toBe(account.getEmail())
    expect(output?.getCpf()).toBe(account.getCpf())
    expect(output?.getCarPlate()).toBe(account.getCarPlate())
    expect(output?.isPassenger).toBe(account.isPassenger)
    expect(output?.isDriver).toBe(account.isDriver)
    expect(output?.getCreatedAt()).toBe(account.getCreatedAt())
    expect(output?.getUpdateAt()).toBe(account.getUpdateAt())
  })

  test('Should return null when getAccountById returns null', async () => {
    const output: Account | null = await dbAccountRepository.getAccountById(faker.datatype.uuid())
    expect(output).toBeNull()
  })

  test('Should return account by id', async () => {
    const account: Account = mockAccount()
    await dbAccountRepository.saveAccount(account)
    const output: Account | null = await dbAccountRepository.getAccountById(account.getAccountId())
    expect(output?.getAccountId()).toBe(account.getAccountId())
    expect(output?.getName()).toBe(account.getName())
    expect(output?.getEmail()).toBe(account.getEmail())
    expect(output?.getCpf()).toBe(account.getCpf())
    expect(output?.getCarPlate()).toBe(account.getCarPlate())
    expect(output?.isPassenger).toBe(account.isPassenger)
    expect(output?.isDriver).toBe(account.isDriver)
    expect(output?.getCreatedAt()).toBe(account.getCreatedAt())
    expect(output?.getUpdateAt()).toBe(account.getUpdateAt())
  })
})
