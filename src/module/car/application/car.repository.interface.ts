import { IBaseRepository } from '../../../common/domain/base.repository';
import { Car } from '../domain/car.entity';

export interface ICarRepository extends IBaseRepository<Car> {}
