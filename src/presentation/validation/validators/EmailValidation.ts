import {type Validation, type ValidationDto} from '@/presentation/controllers/protocols/Validation'
import { type EmailValidator } from '@/presentation/validation/protocols/EmailValidator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: ValidationDto.Input): Record<string, string[]> | undefined {
    const isValid: boolean = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return { [this.fieldName]: ['this is invalid email.'] }
    }
  }
}
