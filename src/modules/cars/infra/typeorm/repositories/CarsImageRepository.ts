import { getRepository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImageRepository implements ICarsImagesRepository {
  private respository = getRepository(CarImage);

  constructor() {
    this.respository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.respository.create({
      car_id,
      image_name,
    });

    await this.respository.save(carImage);

    return carImage;
  }

  async findById(car_id: string): Promise<CarImage[]> {
    const image = await this.respository.find({ car_id });
    return image;
  }
}

export { CarsImageRepository };
