import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  img: string;

  @Column()
  kms: number;

  @Column()
  passengers: number;

  @Column()
  price: number;

  @Column()
  year: number;

  @Column()
  transmission: string;

  @Column()
  airConditioner: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
