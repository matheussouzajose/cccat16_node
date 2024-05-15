import { type Validation, type ValidationDto } from '@/presentation/controllers/protocols/Validation'

export class ValidationComposite implements Validation {
  private errors: Record<string, string[]> = {}
  message: string = ''

  private constructor (private readonly validations: Validation[]) {
  }

  static create (validations: Validation[]): ValidationComposite {
    return new ValidationComposite(validations)
  }

  validate (input: ValidationDto.Input): ValidationDto.Output | undefined {
    this.errors = {}
    this.validations.forEach(validation => {
      const error: ValidationDto.Output | undefined = validation.validate(input)
      if (error) {
        if (!this.message) {
          this.message = error.message
        }
        const [fieldName, errorMessage] = Object.entries(error.errors)[0]
        this.add(fieldName, errorMessage)
      }
    })
    return Object.keys(this.errors).length ? this.output() : undefined
  }

  add (fieldName: string, error: string): void {
    if (!this.errors[fieldName]) {
      this.errors[fieldName] = []
    }
    this.errors[fieldName].push(error)
  }

  private output (): ValidationDto.Output {
    return {
      message: this.getMessage(),
      errors: this.errors
    }
  }

  private getMessage (): string {
    let total = 0
    for (const error in this.errors) {
      total += this.errors[error].length
    }
    if (total > 1) {
      return this.message + ` (and ${total - 1} more errors)`
    }
    return this.message
  }
}
