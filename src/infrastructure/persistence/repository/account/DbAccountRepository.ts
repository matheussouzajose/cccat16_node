import type AccountRepository from '@/domain/account/repository/AccountRepository'
import Account from '@/domain/account/entity/Account'
import type DatabaseConnection from '@/infrastructure/database/DatabaseConnection'
import * as process from 'node:process'

export default class DbAccountRepository implements AccountRepository {
  schema?: string

  constructor (private readonly connection: DatabaseConnection) {
    this.schema = process.env.DB_SCHEMA
  }

  async getAccountByEmail (email: string): Promise<Account | null> {
    const [accountData] = await this.connection.query(`select * from ${this.schema}.account where email = ($1)`, [email])
    if (!accountData) return null
    return Account.restore(
      accountData.account_id,
      accountData.name,
      accountData.email,
      accountData.cpf,
      accountData.car_plate,
      accountData.is_passenger,
      accountData.is_driver,
      accountData.created_at,
      accountData.updated_at
    )
  }

  async saveAccount (account: Account): Promise<void> {
    await this.connection.query(`
            insert into ${this.schema}.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, created_at, updated_at) 
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
      account.getAccountId(),
      account.getName(),
      account.getEmail(),
      account.getCpf(),
      account.getCarPlate(),
      account.isPassenger,
      account.isDriver,
      account.getCreatedAt(),
      account.getUpdateAt()
    ])
  }

  async getAccountById (id: string): Promise<Account | null> {
    const [accountData] = await this.connection.query(
            `select * from ${this.schema}.account where account_id = ($1)`,
            [id]
    )
    if (!accountData) return null
    return Account.restore(
      accountData.account_id,
      accountData.name,
      accountData.email,
      accountData.cpf,
      accountData.car_plate,
      accountData.is_passenger,
      accountData.is_driver,
      accountData.created_at,
      accountData.updated_at
    )
  }

  async checkAccountByEmail (email: string): Promise<boolean> {
    const [accountData] = await this.connection.query(`select * from ${this.schema}.account where email = ($1)`, [email])
    return !!accountData
  }
}
