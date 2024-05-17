import {
  type Validation,
  type ValidationDto,
} from '@/presentation/controllers/protocols/Validation';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: ValidationDto.Input): ValidationDto.Output[] | undefined {
    if (!input[this.fieldName]) {
      return [
        {
          detail: 'The field is required.',
          pointer: this.fieldName,
        },
      ];
    }
  }
}
