import { type Validation, type ValidationDto } from '@/presentation/controllers/protocols/Validation'

export class ValidationComposite implements Validation {
  private errors: Record<string, string[]> = {}

  private constructor (private readonly validations: Validation[]) {
  }

  static create (validations: Validation[]): ValidationComposite {
    return new ValidationComposite(validations)
  }

  validate (input: ValidationDto.Input): Record<string, string[]> | undefined {
    this.errors = {}
    this.validations.forEach(validation => {
      const error: Record<string, string[]> | undefined = validation.validate(input)
      if (error) {
        const [fieldName, errorMessage] = Object.entries(error)[0]
        this.add(fieldName, errorMessage[0])
      }
    })
    return Object.keys(this.errors).length ? this.errors : undefined
  }

  add (fieldName: string, error: string): void {
    if (!this.errors[fieldName]) {
      this.errors[fieldName] = []
    }
    this.errors[fieldName].push(error)
  }
}
