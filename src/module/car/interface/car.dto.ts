import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Brand is too short' })
  brand: string;

  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsString()
  img: string;

  @IsNumber()
  kms: number;

  @IsNumber()
  passengers: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  year: number;

  @IsString()
  transmission: string;

  @IsBoolean()
  airConditioner: boolean;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
