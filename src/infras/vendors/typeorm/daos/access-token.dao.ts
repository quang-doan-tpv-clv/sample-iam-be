import { AccessTokenEntity } from '../entities';
import { sqliteDataSource } from '../data-sources';

export const AccessTokenDao = sqliteDataSource.getRepository(AccessTokenEntity);
