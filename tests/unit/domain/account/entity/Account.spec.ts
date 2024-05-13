import Account from '@/domain/account/entity/Account'

describe('Account Entity', function () {
  test('Should create an passenger account', function () {
    const account: Account = Account.create(
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      '',
      true,
      false
    )
    expect(account.accountId).toBeDefined()
    expect(account.createdAt).toBeDefined()
    expect(account.updatedAt).toBeDefined()
    expect(account.getName()).toBe('John Doe')
    expect(account.getEmail()).toBe('john.doe@email.com')
    expect(account.getCpf()).toBe('25428860081')
    expect(account.getCarPlate()).toBe('')
    expect(account.isPassenger).toBeTruthy()
    expect(account.isDriver).toBeFalsy()
  })

  test('Should create an driver account', function () {
    const account: Account = Account.create(
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      'AMD1234',
      false,
      true
    )
    expect(account.accountId).toBeDefined()
    expect(account.createdAt).toBeDefined()
    expect(account.updatedAt).toBeDefined()
    expect(account.getName()).toBe('John Doe')
    expect(account.getEmail()).toBe('john.doe@email.com')
    expect(account.getCpf()).toBe('25428860081')
    expect(account.getCarPlate()).toBe('AMD1234')
    expect(account.isPassenger).toBeFalsy()
    expect(account.isDriver).toBeTruthy()
  })

  test('Should restore an account', function () {
    const account: Account = Account.create(
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      'AMD1234',
      false,
      true
    )
    expect(account.accountId).toBeDefined()
    expect(account.createdAt).toBeDefined()
    expect(account.updatedAt).toBeDefined()
    expect(account.getName()).toBe('John Doe')
    expect(account.getEmail()).toBe('john.doe@email.com')
    expect(account.getCpf()).toBe('25428860081')
    expect(account.getCarPlate()).toBe('AMD1234')
    expect(account.isPassenger).toBeFalsy()
    expect(account.isDriver).toBeTruthy()
  })

  test('Should change values', function () {
    const account: Account = Account.create(
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      'AMD1234',
      false,
      true
    )
    account.changeName('John B')
    account.changeEmail('john.b@email.com')
    account.changeCpf('47291408008')
    account.changeCarPlate('AMD1233')
    expect(account.getName()).toBe('John B')
    expect(account.getEmail()).toBe('john.b@email.com')
    expect(account.getCpf()).toBe('47291408008')
    expect(account.getCarPlate()).toBe('AMD1233')
  })
})
