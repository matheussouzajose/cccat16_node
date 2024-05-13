import Uuid from '@/domain/shared/value-object/Uuid'

export default class Account {
  private constructor (
    readonly accountId: Uuid,
    private name: string,
    private email: string,
    private cpf: string,
    private carPlate: string,
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
    return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver, createdAt, createdAt)
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
      name,
      email,
      cpf,
      carPlate,
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
    return this.name
  }

  getEmail (): string {
    return this.email
  }

  getCpf (): string {
    return this.cpf
  }

  getCarPlate (): string {
    return this.carPlate
  }

  getCreatedAt (): string {
    return this.createdAt.toLocaleDateString('pt-br')
  }

  getUpdateAt (): string {
    return this.updatedAt.toLocaleDateString('pt-br')
  }

  changeName (name: string): void {
    this.name = name
    this.updatedAt = new Date()
  }

  changeEmail (email: string): void {
    this.email = email
    this.updatedAt = new Date()
  }

  changeCpf (cpf: string): void {
    this.cpf = cpf
    this.updatedAt = new Date()
  }

  changeCarPlate (carPlate: string): void {
    this.carPlate = carPlate
    this.updatedAt = new Date()
  }
}
