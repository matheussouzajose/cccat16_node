import {
  type Validation,
  type ValidationDto,
} from '@/presentation/controllers/protocols/Validation';
import { type UuidValidator } from '@/presentation/validation/protocols/UuidValidator';

export default class UuidValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly uuidValidator: UuidValidator,
  ) {}

  validate(input: ValidationDto.Input): ValidationDto.Output[] | undefined {
    const isValid: boolean = this.uuidValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return [
        {
          detail: 'Must be a valid uuid.',
          pointer: this.fieldName,
        },
      ];
    }
  }
}
