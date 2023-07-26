import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  brand: string;

  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsNumber()
  @Type(() => Number)
  kms: number;

  @IsNumber()
  @Type(() => Number)
  passengers: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsString()
  transmission: string;

  @IsBoolean()
  @Type(() => Boolean)
  airConditioner: boolean;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
