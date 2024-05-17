import {
  type Validation,
  type ValidationDto,
} from '@/presentation/controllers/protocols/Validation';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: ValidationDto.Input): ValidationDto.Output[] | undefined {
    const errors = this.errors(input);
    if (errors.length > 0) {
      return errors;
    }
    return undefined;
  }

  errors(input: ValidationDto.Input): ValidationDto.Output[] {
    const errors: ValidationDto.Output[] = [];
    for (const validation of this.validations) {
      const output = validation.validate(input);
      if (output) {
        errors.push(output[0]);
      }
    }
    return errors;
  }
}
