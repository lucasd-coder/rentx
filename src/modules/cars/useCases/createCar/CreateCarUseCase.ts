// import { inject, injectable } from 'tsyringe';

import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_place: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private corsRepository: ICarsRepository,
  ) {}

  async excute({
    name,
    description,
    daily_rate,
    license_place,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExist = await this.corsRepository.findByLicensePlate(
      license_place,
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exist!');
    }

    const car = await this.corsRepository.create({
      name,
      description,
      daily_rate,
      license_place,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
