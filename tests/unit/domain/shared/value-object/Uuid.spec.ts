import Uuid from '@/domain/shared/value-object/Uuid';
import { UuidError } from '@/domain/shared/error/UuidError';

describe('Uuid Value Object', () => {
  test('Should random new uuid', () => {
    const uuid: Uuid = Uuid.random();
    expect(uuid.value).toBeDefined();
  });

  test('Should throw if Uuid throws', async () => {
    expect(() => new Uuid('uuid')).toThrow(UuidError.invalid('uuid'));
  });
});
