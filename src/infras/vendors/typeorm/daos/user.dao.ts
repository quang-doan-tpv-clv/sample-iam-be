import { UserEntity } from '../entities';
import { sqliteDataSource } from '../data-sources';

export const UserDao = sqliteDataSource.getRepository(UserEntity);
