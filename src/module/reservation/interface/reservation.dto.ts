import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Car } from '../../car/domain/car.entity';
import { User } from '../../user/domain/user.entity';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  finishDate: Date;

  @IsNotEmpty()
  @Type(() => Number)
  pricePerDay: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  statusId: boolean;

  @Type(() => Car)
  car: Car;

  @Type(() => User)
  user: User;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
