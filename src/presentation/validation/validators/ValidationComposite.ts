import { type Validation, type ValidationDto } from '@/presentation/controllers/protocols/Validation'
import ValidationError from '@/presentation/errors/ValidationError'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {
  }

  validate (input: ValidationDto.Input): ValidationDto.Output | undefined {
    const errors = this.errors(input)
    if (errors.length > 0) {
      throw ValidationError.create(errors)
    }
    return undefined
  }

  errors (input: ValidationDto.Input): ValidationDto.Output[] {
    const errors: ValidationDto.Output[] = []
    for (const validation of this.validations) {
      const output = validation.validate(input)
      if (output) {
        errors.push(output)
      }
    }
    return errors
  }
}
