import Cpf from '@/domain/account/value-object/Cpf'
import { CpfError } from '@/domain/account/error/CpfError'

describe('Email Value Object', () => {
  test('Should return new cpf', () => {
    const cpf: Cpf = new Cpf('25428860081')
    expect(cpf).toBeInstanceOf(Cpf)
    expect(cpf.value).toBeDefined()
  })

  test('Should throw if Cpf throws', async () => {
    expect(() => new Cpf('1234567')).toThrow(CpfError.invalid('1234567'))
  })
})
