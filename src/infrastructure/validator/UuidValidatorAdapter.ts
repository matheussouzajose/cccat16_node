import { type UuidValidator } from '@/presentation/validation/protocols/UuidValidator';
import { validate } from 'uuid';

export class UuidValidatorAdapter implements UuidValidator {
  isValid(id: string): boolean {
    return validate(id);
  }
}
