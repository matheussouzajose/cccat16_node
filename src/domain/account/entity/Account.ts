import Uuid from '@/domain/shared/value-object/Uuid'
import Name from '@/domain/account/value-object/Name'
import Email from '@/domain/account/value-object/Email'
import Cpf from '@/domain/account/value-object/Cpf'
import CarPlate from '@/domain/account/value-object/CarPlate'

export default class Account {
  private constructor (
    readonly accountId: Uuid,
    private name: Name,
    private email: Email,
    private cpf: Cpf,
    private carPlate: CarPlate,
    readonly isPassenger: boolean,
    readonly isDriver: boolean,
    readonly createdAt: Date,
    private updatedAt: Date
  ) {
  }

  static create (
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    isPassenger: boolean,
    isDriver: boolean
  ): Account {
    const accountId: Uuid = Uuid.random()
    const createdAt: Date = new Date()
    return new Account(
      accountId,
      new Name(name),
      new Email(email),
      new Cpf(cpf),
      new CarPlate(carPlate),
      isPassenger,
      isDriver,
      createdAt,
      createdAt
    )
  }

  static restore (
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    isPassenger: boolean,
    isDriver: boolean,
    createdAt: string,
    updatedAt: string
  ): Account {
    return new Account(
      new Uuid(accountId),
      new Name(name),
      new Email(email),
      new Cpf(cpf),
      new CarPlate(carPlate),
      isPassenger,
      isDriver,
      new Date(createdAt),
      new Date(updatedAt)
    )
  }

  getAccountId (): string {
    return this.accountId.value
  }

  getName (): string {
    return this.name.value
  }

  getEmail (): string {
    return this.email.value
  }

  getCpf (): string {
    return this.cpf.value
  }

  getCarPlate (): string {
    return this.carPlate.value
  }

  getCreatedAt (): string {
    return this.createdAt.toLocaleDateString()
  }

  getUpdateAt (): string {
    return this.updatedAt.toLocaleDateString()
  }

  changeName (name: string): void {
    this.name = new Name(name)
    this.updatedAt = new Date()
  }

  changeEmail (email: string): void {
    this.email = new Email(email)
    this.updatedAt = new Date()
  }

  changeCpf (cpf: string): void {
    this.cpf = new Cpf(cpf)
    this.updatedAt = new Date()
  }

  changeCarPlate (carPlate: string): void {
    this.carPlate = new CarPlate(carPlate)
    this.updatedAt = new Date()
  }
}
