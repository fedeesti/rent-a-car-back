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
} from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto, UpdateCarDto } from './car.dto';
import { Car } from '../domain/car.entity';
import { ValidationPipe } from '../../../common/interface/validation.pipe';
import { mapRequestToEntity } from './car.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { validateFile } from '../../../common/interface/upload-img.validate';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  async getCars(): Promise<Car[]> {
    const cars = await this.service.findAll();

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
  @UseInterceptors(FileInterceptor('file'))
  save(
    @UploadedFile(validateFile) file: Express.Multer.File,
    @Body(new ValidationPipe()) carDto: CreateCarDto
  ) {
    console.log(carDto);
    console.log(file);
    // return this.service.create(mapRequestToEntity(carDto));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateCarDto
  ): Promise<Car> {
    return this.service.update(id, fieldsToUpdate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.service.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(validateFile) file: Express.Multer.File) {
    console.log(file);
  }
}
