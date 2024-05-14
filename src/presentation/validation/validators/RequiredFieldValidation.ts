import { type Validation, type ValidationDto } from '@/presentation/controllers/protocols/Validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: ValidationDto.Input): Record<string, string[]> | undefined {
    if (!input[this.fieldName]) {
      return { [this.fieldName]: ['this field is required.'] }
    }
  }
}
