import type Account from '@/domain/account/entity/Account';

export default interface AccountRepository {
  saveAccount: (account: Account) => Promise<void>;
  getAccountByEmail: (email: string) => Promise<Account | null>;
  checkAccountByEmail: (email: string) => Promise<boolean>;
  getAccountById: (id: string) => Promise<Account | null>;
}
