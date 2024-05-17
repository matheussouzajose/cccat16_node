import {
  connectDbTesting,
  disconnectDbTesting,
} from '@/tests/setup-db-testing';
import AddAccountUseCase, {
  type AddAccountUseCaseDto,
} from '@/application/usecase/account/AddAccountUseCase';
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository';
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter';
import { mockAccountPassenger } from '@/tests/mocks/MockAccount';
import MailerGatewayStub from '@/tests/stubs/MailerGatewayStub';

describe('Add Account UseCase', () => {
  let addAccountUseCase: AddAccountUseCase;
  let mailerGateway: MailerGatewayStub;

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter();
    const accountRepository = new DbAccountRepository(pgPromiseAdapter);
    mailerGateway = new MailerGatewayStub();
    addAccountUseCase = new AddAccountUseCase(accountRepository, mailerGateway);
  });

  beforeEach(async (): Promise<void> => {
    await connectDbTesting();
  });

  afterEach(async (): Promise<void> => {
    await disconnectDbTesting();
  });

  test('Should create an passenger account', async () => {
    const input: AddAccountUseCaseDto.Input = mockAccountPassenger();
    const output: AddAccountUseCaseDto.Output =
      await addAccountUseCase.execute(input);
    expect(mailerGateway.recipient).toBe(input.email);
    expect(output.accountId).toBeDefined();
  });

  test('Should throws if email already exists', async () => {
    const input: AddAccountUseCaseDto.Input = mockAccountPassenger();
    await addAccountUseCase.execute(input);
    const output = addAccountUseCase.execute(input);
    await expect(output).rejects.toThrow();
  });
});
