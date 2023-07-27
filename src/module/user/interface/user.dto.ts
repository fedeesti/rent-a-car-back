import { PartialType } from '@nestjs/mapped-types';
import {
  IsAlpha,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsAlpha()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  lastname: string;

  @IsString()
  docType: string;

  @IsNumberString()
  @Length(7, 8)
  @IsNotEmpty()
  docNumber: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
