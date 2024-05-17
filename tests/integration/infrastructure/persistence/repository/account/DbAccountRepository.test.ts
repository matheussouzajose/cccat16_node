import {
  connectDbTesting,
  disconnectDbTesting,
} from '@/tests/setup-db-testing';
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository';
import type AccountRepository from '@/domain/account/repository/AccountRepository';
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter';
import type Account from '@/domain/account/entity/Account';
import { mockAccount } from '@/tests/mocks/MockAccount';
import * as faker from 'faker';

describe('Db Account Repository', () => {
  let dbAccountRepository: AccountRepository;
  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter();
    dbAccountRepository = new DbAccountRepository(pgPromiseAdapter);
  });

  beforeEach(async (): Promise<void> => {
    void connectDbTesting();
  });

  afterEach(async (): Promise<void> => {
    await disconnectDbTesting();
  });

  test('Should return null when getAccountByEmail returns null', async () => {
    const output: Account | null =
      await dbAccountRepository.getAccountByEmail('john.doe@email.com');
    expect(output).toBeNull();
  });

  test('Should return account by email', async () => {
    const account: Account = mockAccount();
    await dbAccountRepository.saveAccount(account);
    const output: Account | null = await dbAccountRepository.getAccountByEmail(
      account.getEmail(),
    );
    expectedAccount(output, account);
  });

  test('Should return null when getAccountById returns null', async () => {
    const output: Account | null = await dbAccountRepository.getAccountById(
      faker.datatype.uuid(),
    );
    expect(output).toBeNull();
  });

  test('Should return account by id', async () => {
    const account: Account = mockAccount();
    await dbAccountRepository.saveAccount(account);
    const output: Account | null = await dbAccountRepository.getAccountById(
      account.getAccountId(),
    );
    expectedAccount(output, account);
  });
});

function expectedAccount(expected: any, received: any): void {
  expect(expected?.getAccountId()).toBe(received.getAccountId());
  expect(expected?.getName()).toBe(received.getName());
  expect(expected?.getEmail()).toBe(received.getEmail());
  expect(expected?.getCpf()).toBe(received.getCpf());
  expect(expected?.getCarPlate()).toBe(received.getCarPlate());
  expect(expected?.isPassenger).toBe(received.isPassenger);
  expect(expected?.isDriver).toBe(received.isDriver);
  expect(expected?.getCreatedAt()).toEqual(received.getCreatedAt());
  expect(expected?.getUpdateAt()).toEqual(received.getUpdateAt());
}
