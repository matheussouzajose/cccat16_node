import { type AddAccountUseCaseDto } from '@/application/usecase/account/AddAccountUseCase'
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

export const mockAccountPassenger = (): AddAccountUseCaseDto.Input => ({
  name: 'John Doe',
  email: `john.doe${Math.random()}@gmail.com`,
  cpf: '87748248800',
  isPassenger: true
})

export const mockAccountDriver = (): AddAccountUseCaseDto.Input => ({
  name: 'John Doe',
  email: `john.doe${Math.random()}@gmail.com`,
  cpf: '87748248800',
  isPassenger: false,
  carPlate: 'AMD1234',
  isDriver: true
})
