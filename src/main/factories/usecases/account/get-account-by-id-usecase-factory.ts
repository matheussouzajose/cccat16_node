import { makeDbAccountRepository } from '@/main/factories/repositories/account/account-repository-factory';
import GetAccountByIdUseCase from '@/application/usecase/account/GetAccountByIdUseCase';

export const makeGetAccountByIdUseCase = (): GetAccountByIdUseCase => {
  return new GetAccountByIdUseCase(makeDbAccountRepository());
};
