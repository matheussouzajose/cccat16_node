import type AccountRepository from '@/domain/account/repository/AccountRepository'
import Account from '@/domain/account/entity/Account'
import { EmailError } from '@/domain/account/error/EmailError'
import type MailerGateway from '@/infrastructure/gateway/MailerGateway'

export default class AddAccountUseCase {
  constructor (private readonly accountRepository: AccountRepository, private readonly mailerGateway: MailerGateway) {
  }

  async execute (input: AddAccountDto.Input): Promise<AddAccountDto.Output> {
    const existing: Account | null = await this.accountRepository.getAccountByEmail(input.email)
    if (existing) {
      throw EmailError.alreadyExists(input.email)
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

export namespace AddAccountDto {
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
