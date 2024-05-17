import { type Controller } from '@/presentation/controllers/protocols/Controller';
import GetAccountController from '@/presentation/controllers/account/GetAccountController';
import { makeGetAccountByIdUseCase } from '@/main/factories/usecases/account/get-account-by-id-usecase-factory';
import { makeGetAccountValidation } from '@/main/factories/validators/account/get-account-validation-factory';

export const makeGetAccountController = (): Controller => {
  return new GetAccountController(
    makeGetAccountByIdUseCase(),
    makeGetAccountValidation(),
  );
};
