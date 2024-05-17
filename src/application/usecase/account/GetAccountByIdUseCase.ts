import type AccountRepository from '@/domain/account/repository/AccountRepository'
import type Account from '@/domain/account/entity/Account'

export default class GetAccountByIdUseCase {
  constructor (private readonly accountRepository: AccountRepository) {
  }

  async execute (id: string): Promise<GetAccountById.Output | null> {
    const account: Account | null = await this.accountRepository.getAccountById(id)
    if (!account) return null
    return {
      accountId: account.getAccountId(),
      name: account.getName(),
      email: account.getEmail(),
      cpf: account.getCpf(),
      carPlate: account.getCarPlate(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
      createdAt: account.getCreatedAt().toLocaleString(),
      updatedAt: account.getUpdateAt().toLocaleString()
    }
  }
}

export namespace GetAccountById {
  export type Output = {
    accountId: string
    name: string
    email: string
    cpf: string
    carPlate: string
    isPassenger: boolean
    isDriver: boolean
    createdAt: string
    updatedAt: string
  }
}
