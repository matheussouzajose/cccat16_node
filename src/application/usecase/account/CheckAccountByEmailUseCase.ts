import type AccountRepository from '@/domain/account/repository/AccountRepository'

export default class CheckAccountByEmailUseCase {
  constructor (private readonly accountRepository: AccountRepository) {
  }

  async execute (email: string): Promise<boolean> {
    const output = await this.accountRepository.getAccountByEmail(email)
    return !!output
  }
}
