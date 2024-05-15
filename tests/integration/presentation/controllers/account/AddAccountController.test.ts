import { connectDbTesting, disconnectDbTesting } from '@/tests/setup-db-testing'
import AddAccountController, { type AddAccountControllerDto } from '@/presentation/controllers/account/AddAccountController'
import AddAccountUseCase from '@/application/usecase/account/AddAccountUseCase'
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository'
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'
import MailerGatewayConsole from '@/infrastructure/gateway/MailerGatewayConsole'
import CheckAccountByEmailUseCase from '@/application/usecase/account/CheckAccountByEmailUseCase'
import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'
import { serverError } from '@/presentation/helpers/http-helper'
import { NameError } from '@/domain/account/error/NameError'
import { makeAddAccountValidation } from '@/main/factories/validators/account/add-account-validation-factory'

describe('Add Account Controller', () => {
  let addAccountController: AddAccountController

  beforeAll(() => {
    const pgPromiseAdapter = new PgPromiseAdapter()
    const accountRepository = new DbAccountRepository(pgPromiseAdapter)
    const checkAccountByEmailUseCase = new CheckAccountByEmailUseCase(accountRepository)
    const mailerGatewayConsole = new MailerGatewayConsole()
    const addAccountUseCase = new AddAccountUseCase(accountRepository, mailerGatewayConsole)
    addAccountController = new AddAccountController(checkAccountByEmailUseCase, addAccountUseCase, makeAddAccountValidation())
  })

  beforeEach(async (): Promise<void> => { await connectDbTesting() })

  afterEach(async (): Promise<void> => { await disconnectDbTesting() })

  test('Should return 422 if Validation return true', async () => {
    const input: AddAccountControllerDto.Input = {
      name: '',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '87748248800',
      is_passenger: true
    }
    await addAccountController.handle(input)
    const output: HttpResponse = await addAccountController.handle(input)
    expect(422).toBe(output.statusCode)
    expect({ name: ['this field is required.'] }).toEqual(output.body)
  })

  test('Should return 422 if CheckByEmail return true', async () => {
    const input: AddAccountControllerDto.Input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '87748248800',
      is_passenger: true
    }
    await addAccountController.handle(input)
    const output: HttpResponse = await addAccountController.handle(input)
    expect(422).toBe(output.statusCode)
    expect({ email: 'The email already exists.' }).toEqual(output.body)
  })

  test('Should return 201 if create account successfully', async () => {
    const input: AddAccountControllerDto.Input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '87748248800',
      is_passenger: true
    }
    const output: HttpResponse = await addAccountController.handle(input)
    expect(201).toBe(output.statusCode)
    expect(output.body.accountId).toBeDefined()
  })

  test('Should return 500 if create account fails', async () => {
    const input: AddAccountControllerDto.Input = {
      name: 'John',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '87748248800',
      is_passenger: true
    }
    const output: HttpResponse = await addAccountController.handle(input)
    expect(output).toEqual(serverError(NameError.invalid(input.name)))
  })
})
