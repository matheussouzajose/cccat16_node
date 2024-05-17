import Name from '@/domain/account/value-object/Name';
import { NameError } from '@/domain/account/error/NameError';

describe('Name Value Object', () => {
  test('Should return new name', () => {
    const name: Name = new Name('John Doe');
    expect(name).toBeInstanceOf(Name);
    expect(name.value).toBeDefined();
  });

  test('Should throw if Name throws', async () => {
    expect(() => new Name('John')).toThrow(NameError.invalid());
  });
});
