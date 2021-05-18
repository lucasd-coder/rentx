import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.excute({
      name: 'Nome Car',
      description: 'Description Car',
      daily_rate: 100,
      license_place: 'ABC-1234',
      fine_amount: 50,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.excute({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_place: 'ABC-1234',
      fine_amount: 50,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.excute({
        name: 'Car2',
        description: 'Description Car',
        daily_rate: 100,
        license_place: 'ABC-1234',
        fine_amount: 50,
        brand: 'Brand',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exist!'));
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.excute({
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_place: 'ABC-1234',
      fine_amount: 50,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
