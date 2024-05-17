import CarPlate from '@/domain/account/value-object/CarPlate';
import { CarPlateError } from '@/domain/account/error/CarPlateError';

describe('CarPlate Value Object', () => {
  test('Should return new car plate', () => {
    const carPlate: CarPlate = new CarPlate('AMD1234');
    expect(carPlate.value).toBe('AMD1234');
  });

  test('Should throw if Cpf throws', async () => {
    expect(() => new CarPlate('1234567')).toThrow(
      CarPlateError.invalid('1234567'),
    );
  });
});
