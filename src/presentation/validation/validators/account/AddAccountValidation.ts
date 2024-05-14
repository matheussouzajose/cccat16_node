import { ValidationComposite } from '@/presentation/validation/validators/ValidationComposite'
import { type Validation } from '@/presentation/controllers/protocols/Validation'
import { RequiredFieldValidation } from '@/presentation/validation/validators/RequiredFieldValidation'
import { EmailValidation } from '@/presentation/validation/validators/EmailValidation'
import { EmailValidatorAdapter } from '@/infrastructure/validator/EmailValidatorAdapter'

export const makeAddAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'cpf', 'is_passenger']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return ValidationComposite.create(validations)
}
