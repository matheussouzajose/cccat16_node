import Email from '@/domain/account/value-object/Email';
import { EmailError } from '@/domain/account/error/EmailError';

describe('Email Value Object', () => {
  test('Should return new email', () => {
    const email: Email = new Email('john.doe@email.com');
    expect(email.value).toBe('john.doe@email.com');
  });

  test('Should throw if Email throws', async () => {
    expect(() => new Email('John')).toThrow(EmailError.invalid('John'));
  });
});
