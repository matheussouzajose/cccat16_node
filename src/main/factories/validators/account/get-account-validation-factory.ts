import { ValidationComposite } from '@/presentation/validation/validators/ValidationComposite'
import type { Validation } from '@/presentation/controllers/protocols/Validation'
import UuidValidation from '@/presentation/validation/validators/UuidValidation'
import { UuidValidatorAdapter } from '@/infrastructure/validator/UuidValidatorAdapter'

export const makeGetAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new UuidValidation('id', new UuidValidatorAdapter()))
  return new ValidationComposite(validations)
}
