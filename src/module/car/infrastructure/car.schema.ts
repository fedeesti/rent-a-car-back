import { Car } from '../domain/car.entity';
import { BaseSchema } from '../../../common/infrastructure/baseSchema';

export const CarSchema = new BaseSchema<Car>({
  name: 'Car',
  target: Car,
  tableName: 'cars',
  columns: {
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    img: {
      type: String,
    },
    kms: {
      type: Number,
    },
    passengers: {
      type: Number,
    },
    price: {
      type: Number,
    },
    year: {
      type: Number,
    },
    transmission: {
      type: String,
    },
    airConditioner: {
      type: Boolean,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      deleteDate: true,
    },
  },
});
