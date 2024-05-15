import { type Validation, type ValidationDto } from '@/presentation/controllers/protocols/Validation'
import { type EmailValidator } from '@/presentation/validation/protocols/EmailValidator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: ValidationDto.Input): ValidationDto.Output | undefined {
    const isValid: boolean = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      const message: string = `The ${this.fieldName} must be a valid email address.`
      return {
        message,
        errors: {
          [this.fieldName]: message
        }
      }
    }
  }
}
