import type AccountRepository from '@/domain/account/repository/AccountRepository'
import Account from '@/domain/account/entity/Account'
import type MailerGateway from '@/application/protocols/gateway/MailerGateway'
import { EmailError } from '@/domain/account/error/EmailError'

export default class AddAccountUseCase {
  constructor (private readonly accountRepository: AccountRepository, private readonly mailerGateway: MailerGateway) {
  }

  async execute (input: AddAccountUseCaseDto.Input): Promise<AddAccountUseCaseDto.Output> {
    const hasEmail = await this.accountRepository.checkAccountByEmail(input.email)
    if (hasEmail) {
      throw EmailError.alreadyExists()
    }
    const account: Account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate ?? '',
      input.isPassenger,
      !!input.isDriver
    )
    await this.accountRepository.saveAccount(account)
    await this.mailerGateway.send(account.getEmail(), 'Welcome', `Welcome, ${account.getName()}!`)
    return {
      accountId: account.getAccountId()
    }
  }
}

export namespace AddAccountUseCaseDto {
  export type Input = {
    name: string
    email: string
    cpf: string
    isPassenger: boolean
    carPlate?: string
    isDriver?: boolean
  }
  export type Output = {
    accountId: string
  }
}
