import {
  connectDbTesting,
  disconnectDbTesting,
} from '@/tests/setup-db-testing';
import GetAccountByIdUseCase, {
  type GetAccountById,
} from '@/application/usecase/account/GetAccountByIdUseCase';
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter';
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository';
import AddAccountUseCase, {
  type AddAccountUseCaseDto,
} from '@/application/usecase/account/AddAccountUseCase';
import MailerGatewayStub from '@/tests/stubs/MailerGatewayStub';
import { mockAccountPassenger } from '@/tests/mocks/MockAccount';
import { v4 } from 'uuid';

describe('Get Account By Id UseCase', () => {
  let getAccountUseCase: GetAccountByIdUseCase;
  let addAccountUseCase: AddAccountUseCase;

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter();
    const accountRepository = new DbAccountRepository(pgPromiseAdapter);
    getAccountUseCase = new GetAccountByIdUseCase(accountRepository);
    addAccountUseCase = new AddAccountUseCase(
      accountRepository,
      new MailerGatewayStub(),
    );
  });

  beforeEach(async (): Promise<void> => {
    await connectDbTesting();
  });

  afterEach(async (): Promise<void> => {
    await disconnectDbTesting();
  });

  test('Should return null when account no existing', async () => {
    const output: GetAccountById.Output | null =
      await getAccountUseCase.execute(v4());
    expect(output).toBeNull();
  });

  test('Should return existing account', async function (): Promise<void> {
    const input: AddAccountUseCaseDto.Input = mockAccountPassenger();
    const { accountId } = await addAccountUseCase.execute(input);
    const output: GetAccountById.Output | null =
      await getAccountUseCase.execute(accountId);
    expect(output?.accountId).toBe(accountId);
    expect(output?.name).toBe(input.name);
    expect(output?.email).toBe(input.email);
    expect(output?.cpf).toBe(input.cpf);
    expect(output?.isPassenger).toBe(input.isPassenger);
    expect(output?.carPlate).toBe('');
    expect(output?.isDriver).toBeFalsy();
  });
});
