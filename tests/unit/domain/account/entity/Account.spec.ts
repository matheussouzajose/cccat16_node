import Account from '@/domain/account/entity/Account'
import { v4 } from 'uuid'

describe('Account Entity', () => {
  test('Should create an passenger account', () => {
    const account: Account = Account.create(
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      '',
      true,
      false
    )
    expect(account.getAccountId()).toBeDefined()
    expect(account.getCreatedAt()).toBeDefined()
    expect(account.getUpdateAt()).toBeDefined()
    expect(account.getName()).toBe('John Doe')
    expect(account.getEmail()).toBe('john.doe@email.com')
    expect(account.getCpf()).toBe('25428860081')
    expect(account.getCarPlate()).toBe('')
    expect(account.isPassenger).toBeTruthy()
    expect(account.isDriver).toBeFalsy()
  })

  test('Should restore an account', () => {
    const accountId = v4()
    const account: Account = Account.restore(
      accountId,
      'John Doe',
      'john.doe@email.com',
      '25428860081',
      'AMD1234',
      false,
      true,
      '2024-05-17 12:00:00',
      '2024-05-17 12:00:00'
    )
    expect(account.getAccountId()).toBe(accountId)
    expect(account.getCreatedAt().toLocaleString('pt-br')).toBe('17/05/2024, 12:00:00')
    expect(account.getUpdateAt().toLocaleString('pt-br')).toBe('17/05/2024, 12:00:00')
    expect(account.getName()).toBe('John Doe')
    expect(account.getEmail()).toBe('john.doe@email.com')
    expect(account.getCpf()).toBe('25428860081')
    expect(account.getCarPlate()).toBe('AMD1234')
    expect(account.isPassenger).toBeFalsy()
    expect(account.isDriver).toBeTruthy()
  })

  test('Should change values', () => {
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
