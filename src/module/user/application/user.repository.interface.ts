import { IBaseRepository } from '../../../common/domain/base.repository';
import { User } from '../domain/user.entity';

export interface IUserRepository extends IBaseRepository<User> {}
