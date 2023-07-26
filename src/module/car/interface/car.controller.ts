import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Get,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto, UpdateCarDto } from './car.dto';
import { Car } from '../domain/car.entity';
import { ValidationPipe } from '../../../common/interface/validation.pipe';
import { mapRequestToEntity } from './car.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer.config';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  async getCars(): Promise<Car[]> {
    const cars: Car[] = await this.service.findAll();

    return cars;
  }

  @Get(':id')
  getCar(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Car> {
    return this.service.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('img', multerOptions))
  save(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true })) file: Express.Multer.File,
    @Body(new ValidationPipe()) carDto: CreateCarDto
  ) {
    const path = file.path.split('uploads\\')[1];
    const car: Car = mapRequestToEntity(carDto, path);

    return this.service.create(car);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) file: Express.Multer.File,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateCarDto
  ): Promise<Car> {
    return this.service.update(id, fieldsToUpdate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.service.delete(id);
  }
}
