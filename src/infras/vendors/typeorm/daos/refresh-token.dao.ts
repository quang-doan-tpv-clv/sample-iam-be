import { RefreshTokenEntity } from '../entities';
import { sqliteDataSource } from '../data-sources';

export const RefreshTokenDao =
    sqliteDataSource.getRepository(RefreshTokenEntity);
