export default class Account {
  private constructor (
    readonly accountId: string,
    private name: string,
    private email: string,
    private cpf: string,
    private carPlate: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean,
    readonly createdAt: string,
    readonly updatedAt: string
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
    const accountId: string = 'accountId'
    const createdAt: string = (new Date()).toLocaleDateString()
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
    return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver, createdAt, updatedAt)
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

  changeName (name: string): void {
    this.name = name
  }

  changeEmail (email: string): void {
    this.email = email
  }

  changeCpf (cpf: string): void {
    this.cpf = cpf
  }

  changeCarPlate (carPlate: string): void {
    this.carPlate = carPlate
  }
}
