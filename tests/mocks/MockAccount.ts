import { type AddAccountDto } from '@/application/usecase/account/AddAccountUseCase'
import Account from '@/domain/account/entity/Account'
import * as faker from 'faker'

export const mockAccount = (): Account => {
  return Account.restore(
    faker.datatype.uuid(),
    'John Doe',
      `john.doe${Math.random()}@gmail.com`,
      '87748248800',
      '',
      true,
      false,
      (new Date()).toLocaleDateString(),
      (new Date()).toLocaleDateString()
  )
}

export const mockAccountPassenger = (): AddAccountDto.Input => ({
  name: 'John Doe',
  email: `john.doe${Math.random()}@gmail.com`,
  cpf: '87748248800',
  isPassenger: true
})

export const mockAccountDriver = (): AddAccountDto.Input => ({
  name: 'John Doe',
  email: `john.doe${Math.random()}@gmail.com`,
  cpf: '87748248800',
  isPassenger: false,
  carPlate: 'AMD1234',
  isDriver: true
})
