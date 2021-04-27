import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_nome: string): Promise<CarImage>;
  findById(car_id: string): Promise<CarImage[]>;
}

export { ICarsImagesRepository };
