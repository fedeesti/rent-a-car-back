export interface IBaseRepository<T> {
  find(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: number, fields: Partial<T>): Promise<T>;
  delete(id: number): Promise<T>;
}
