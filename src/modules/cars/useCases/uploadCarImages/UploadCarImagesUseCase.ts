import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
// import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<void> {
    // const car = await this.carsImagesRepository.findById(car_id);
    // car.map(async car_image => {
    //   if (car_image.image_name) {
    //     await deleteFile(`./tmp/cars/${car_image.image_name}`);
    //   }
    // });
    image_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
export { UploadCarImagesUseCase };
